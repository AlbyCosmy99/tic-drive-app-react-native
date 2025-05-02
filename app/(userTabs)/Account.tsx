import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import NotLogged from '@/components/auth/NotLogged';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import {handleLogout} from '@/components/ui/buttons/TicDriveAuthButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import IconTextPair from '@/components/ui/IconTextPair';

import useJwtToken from '@/hooks/auth/useJwtToken';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

import HeartIcon from '@/components/svgs/emotions/EmptyHeart';
import CustomerServiceIcon from '@/components/svgs/Headphone';
import Logout from '@/components/svgs/Logout';
import AddressIcon from '@/components/svgs/Map';
import MailIcon from '@/components/svgs/notifications/Mail';
import Remove from '@/components/svgs/Remove';
import FAQ from '@/components/svgs/Faq';
import Translate from '@/components/svgs/Translate';

import VehicleIcon from '@/components/svgs/vehicles/Car2';
import EditIcon from '@/components/svgs/writing/Change';
import SaveIcon from '@/components/svgs/operations/Save';
import TicDriveModal from 'ticdrive-mobile/components/ui/modals/TicDriveModal';
import {setLanguageCode} from '@/stateManagement/redux/slices/languageSlice';
import i18n from '@/i18n';
import {t} from 'i18next';
import User from '@/types/User';
import updateUser from '@/services/http/requests/account/updateUser';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import {login} from '@/stateManagement/redux/slices/authSlice';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({title, children}) => (
  <View className="my-2">
    <Text className="font-medium text-2xl">{title}</Text>
    {children}
  </View>
);

export default function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingEditingUser, setLoadingEditingUser] = useState(false);

  const user = useAppSelector(state => state.auth.user);
  const [editedUser, setEditedUser] = useState<User>({name: user?.name});

  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageChangedModal, setShowLanguageChangedModal] =
    useState(false);

  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(state => state.language.languageCode);
  const token = useJwtToken();
  const navigation = useTicDriveNavigation();
  const {setErrorMessage} = useGlobalErrors();

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', {favorite: true});
  };

  const handleChangeLanguage = (newLanguage: 'en' | 'it') => {
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguageCode(newLanguage));
    setShowLanguageChangedModal(true);
  };

  const handleFAQ = () => {
    navigationPush(navigation, 'FAQScreen');
  };

  const handleOnEdit = async () => {
    setIsEditing(!isEditing);
    if (isEditing && editedUser.name !== user?.name) {
      try {
        setLoadingEditingUser(true);
        await updateUser(editedUser, token ?? '');
        dispatch(login({...user, name: editedUser.name}));
      } catch (e: any) {
        setErrorMessage(e.message);
      } finally {
        setLoadingEditingUser(false);
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: will do later the actual delete logic
            alert('Account deleted (mock)');
          },
        },
      ],
    );
  };

  if (!token)
    return (
      <LinearGradientViewLayout>
        <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
          <TicDriveNavbar />
          <NotLogged />
        </SafeAreaViewLayout>
      </LinearGradientViewLayout>
    );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar canGoBack={false} />
        <View className="mx-2.5">
          {loadingEditingUser ? (
            <View className="h-[88px]">
              <TicDriveSpinner />
            </View>
          ) : (
            <View className="flex-row justify-between items-center h-[88px]">
              <View className="flex-row items-center space-x-4 p-2">
                <CircularUserAvatar
                  uri={user?.imageUrl}
                  styles={{width: 70, height: 70}}
                />
                <View className="w-44">
                  {isEditing ? (
                    <TextInput
                      className="font-semibold text-lg border-b border-gray-300"
                      style={{lineHeight: 20}}
                      value={editedUser.name || ''}
                      onChangeText={text =>
                        setEditedUser({...editedUser, name: text.trim()})
                      }
                      placeholder={t('userAccount.enterYourName')}
                      placeholderTextColor="#888"
                      autoFocus
                      accessibilityLabel="Name Input"
                    />
                  ) : user?.name ? (
                    <Text className="font-semibold text-xl text-gray-800">
                      {user?.name}
                    </Text>
                  ) : (
                    <CrossPlatformButtonLayout onPress={handleOnEdit}>
                      <Text className="font-normal text-lg text-gray-800">
                        {t('useraccount.editYourName')}
                      </Text>
                    </CrossPlatformButtonLayout>
                  )}
                </View>
              </View>

              <View className="flex-row items-center">
                <CrossPlatformButtonLayout onPress={handleOnEdit}>
                  <View className="flex-row items-center">
                    {isEditing ? (
                      <SaveIcon width={20} height={20} />
                    ) : (
                      <EditIcon width={20} height={20} />
                    )}
                    <Text className="text-green-600 font-medium ml-1">
                      {isEditing ? t('common.save') : t('common.edit')}
                    </Text>
                  </View>
                </CrossPlatformButtonLayout>
              </View>
            </View>
          )}

          <HorizontalLine />

          <ScrollView
            className="px-1"
            contentContainerStyle={{paddingBottom: 140}}
          >
            <Section title={t('userAccount.sectionTitle')}>
              <View className="flex-row items-center py-2">
                <MailIcon />
                <Text className="text-base font-medium pl-1">
                  {user?.email || t('notAvailable')}
                </Text>
              </View>

              <HorizontalLine />

              <View className="flex-row items-center py-2">
                <AddressIcon />
                <Text className="text-base font-medium pl-1">
                  {user?.address || t('notAvailable')}
                </Text>
              </View>

              <HorizontalLine />

              <CrossPlatformButtonLayout
                onPress={() => navigationPush(navigation, 'UserVehiclesScreen')}
              >
                <IconTextPair
                  text={t('userAccount.registeredVehicles')}
                  icon={<VehicleIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout onPress={onFavoriteWorkshops}>
                <IconTextPair
                  text={t('userAccount.favoriteWorkshops')}
                  icon={<HeartIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />
            </Section>

            <Section title={t('userAccount.helpAndSupport')}>
              <CrossPlatformButtonLayout
                onPress={() =>
                  setLanguageOptionsVisible(!languageOptionsVisible)
                }
              >
                <IconTextPair
                  text={t('language.changeLanguage')}
                  icon={<Translate />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss={`my-0 pt-1 ${languageOptionsVisible && 'pb-0'}`}
                />
              </CrossPlatformButtonLayout>

              {languageOptionsVisible && (
                <View className="ml-8">
                  <TouchableOpacity
                    className="py-2 pb-1 pt-3"
                    onPress={() => {
                      handleChangeLanguage('it');
                      setLanguageOptionsVisible(false);
                    }}
                  >
                    <Text
                      className={`text-base ${languageCode === 'it' ? 'font-bold text-blue-600' : 'text-black'}`}
                    >
                      🇮🇹 {t('language.italian')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-2"
                    onPress={() => {
                      handleChangeLanguage('en');
                      setLanguageOptionsVisible(false);
                    }}
                  >
                    <Text
                      className={`text-base ${languageCode === 'en' ? 'font-bold text-blue-600' : 'text-black'}`}
                    >
                      🇬🇧 {t('language.english')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <HorizontalLine />

              <CrossPlatformButtonLayout onPress={handleFAQ}>
                <IconTextPair
                  text={t('userAccount.faq')}
                  icon={<FAQ />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout
                onPress={() => alert(t('userAccount.customerSupport'))}
              >
                <IconTextPair
                  text={t('userAccount.customerSupport')}
                  icon={<CustomerServiceIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout
                onPress={() => setShowLogoutModal(true)}
              >
                <IconTextPair
                  text={t('userAccount.logout')}
                  icon={<Logout />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout onPress={handleDeleteAccount}>
                <IconTextPair
                  text="Delete account"
                  icon={<Remove />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
            </Section>
          </ScrollView>
        </View>

        <TicDriveModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout(dispatch, navigation);
          }}
          title={t('userAccount.logout')}
          content={t('userAccount.logoutConfirm')}
          confirmText={t('confirm')}
          cancelText={t('common.cancel')}
          confirmButtonStyle={{backgroundColor: '#E53935'}}
        />
        <TicDriveModal
          visible={showLanguageChangedModal}
          onClose={() => setShowLanguageChangedModal(false)}
          title={t('language.languageChanged') + '!'}
          content={
            t('language.yourNewLanguageIs') +
            ': ' +
            (languageCode === 'en'
              ? t('language.english')
              : t('language.italian')) +
            '.'
          }
          cancelText="Ok!"
          confirmButtonStyle={{backgroundColor: '#E53935'}}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
