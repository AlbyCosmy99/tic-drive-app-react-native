import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// Navigation & State
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';
import { useAppDispatch, useAppSelector } from '@/stateManagement/redux/hooks';

// Layouts
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

// UI Components
import NotLogged from '@/components/auth/NotLogged';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import { handleLogout } from '@/components/ui/buttons/TicDriveAuthButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import IconTextPair from '@/components/ui/IconTextPair';

// Utils & Hooks
import useJwtToken from '@/hooks/auth/useJwtToken';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

// Icons
import HeartIcon from '@/assets/svg/emotions/EmptyHeart.svg';
import CustomerServiceIcon from '@/assets/svg/headphone.svg';
import Logout from '@/assets/svg/logout.svg';
import AddressIcon from '@/assets/svg/map.svg';
import MailIcon from '@/assets/svg/notifications/mail.svg';
import PhoneIcon from '@/assets/svg/notifications/phone.svg';
import Remove from '@/assets/svg/remove.svg';
import FAQ from '@/assets/svg/faq.svg';
import Translate from '@/assets/svg/translate.svg';

import VehicleIcon from '@/assets/svg/vehicles/car2.svg';
import EditIcon from '@/assets/svg/writing/change.svg';
import SaveIcon from '@/assets/svg/operations/save.svg';
import TicDriveModal from 'ticdrive-mobile/components/ui/modals/TicDriveModal';
import { setLanguageCode } from '@/stateManagement/redux/slices/languageSlice';
import i18n from '@/i18n';
import navigationReset from '@/services/navigation/reset';
import { t } from 'i18next';
import User from '@/types/User';
import updateUser from '@/services/http/requests/account/updateUser';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import { login } from '@/stateManagement/redux/slices/authSlice';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View className="my-2">
    <Text className="font-medium text-2xl">{title}</Text>
    {children}
  </View>
);

export default function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingEditingUser, setLoadingEditingUser] = useState(false);

  const user = useAppSelector(state => state.auth.user);
  const [editedUser, setEditedUser] = useState<User>({ name: user?.name });

  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);

  //modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageChangedModal, setShowLanguageChangedModal] =
    useState(false);

  const dispatch = useAppDispatch();

  const languageCode = useAppSelector(state => state.language.languageCode);

  const token = useJwtToken();
  const navigation = useTicDriveNavigation();

  const { setErrorMessage } = useGlobalErrors();

  const handleSaveProfile = async () => {
    if (JSON.stringify(editedUser) !== JSON.stringify(user)) {
      try {
        console.log('Profile updated:', editedUser);
      } catch (error) {
        console.error('Failed to save profile:', error);
        alert('Could not save profile changes.');
      }
    }
    setIsEditing(false);
  };

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', { favorite: true });
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
        { text: 'Cancel', style: 'cancel' },
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
        <TicDriveNavbar />
        <View className="mx-2.5">
          {loadingEditingUser ? (
            <View className="h-[88px]">
              <TicDriveSpinner />
            </View>
          ) : (
            <View className="flex-row justify-between items-center h-[88px]">
              <View className="flex-row items-center space-x-4 p-2">
                <CircularUserAvatar
                  uri={user?.imageurl}
                  styles={{ width: 70, height: 70 }}
                />
                <View className="w-40">
                  {isEditing ? (
                    <TextInput
                      className="font-semibold text-lg border-b border-gray-300"
                      style={{ lineHeight: 20 }}
                      value={editedUser.name || ''}
                      onChangeText={text =>
                        setEditedUser({ ...editedUser, name: text })
                      }
                      placeholder="Enter your name"
                      placeholderTextColor="#888"
                      autoFocus
                      accessibilityLabel="Name Input"
                    />
                  ) : (
                    user?.name ? (
                      <Text className="font-semibold text-xl text-gray-800">
                        {user?.name}
                      </Text>
                    ) : (
                      <CrossPlatformButtonLayout removeAllStyles onPress={handleOnEdit}>
                        <Text className="font-normal text-lg text-gray-800">
                          Edit your name
                        </Text>
                      </CrossPlatformButtonLayout>
                    )
                  )}
                </View>
              </View>

              <View className="flex-row items-center">
                <CrossPlatformButtonLayout
                  removeAllStyles
                  onPress={handleOnEdit}
                >
                  <View className="flex-row items-center">
                    {isEditing ? (
                      <SaveIcon width={20} height={20} />
                    ) : (
                      <EditIcon width={20} height={20} />
                    )}
                    <Text className="text-green-600 font-medium ml-1">
                      {isEditing ? 'Save' : 'Edit'}
                    </Text>
                  </View>
                </CrossPlatformButtonLayout>
              </View>
            </View>
          )}

          <HorizontalLine />

          <ScrollView
            className="px-1"
            contentContainerStyle={{ paddingBottom: 140 }}
          >
            <Section title="Account">
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
                removeAllStyles
                onPress={() => navigationPush(navigation, 'UserVehiclesScreen')}
              >
                <IconTextPair
                  text="Registered vehicles"
                  icon={<VehicleIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />

              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={onFavoriteWorkshops}
              >
                <IconTextPair
                  text="Favorite workshops"
                  icon={<HeartIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
            </Section>
            <Section title="Help and support">
              <CrossPlatformButtonLayout
                removeAllStyles
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
              <CrossPlatformButtonLayout removeAllStyles onPress={handleFAQ}>
                <IconTextPair
                  text="FAQ"
                  icon={<FAQ />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => alert('Customer support')}
              >
                <IconTextPair
                  text="Customer support"
                  icon={<CustomerServiceIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => setShowLogoutModal(true)}
              >
                <IconTextPair
                  text="Logout"
                  icon={<Logout />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              <HorizontalLine />

              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={handleDeleteAccount}
              >
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

        {/* modals */}
        <TicDriveModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout(dispatch, navigation);
          }}
          title="Logout"
          content="Are you sure you want to log out?"
          confirmText="Confirm"
          cancelText="Cancel"
          confirmButtonStyle={{ backgroundColor: '#E53935' }}
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
          confirmButtonStyle={{ backgroundColor: '#E53935' }}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
