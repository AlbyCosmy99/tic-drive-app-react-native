import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// Navigation & State
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';

// Layouts
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

// UI Components
import NotLogged from '@/components/auth/NotLogged';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import {handleLogout} from '@/components/ui/buttons/TicDriveAuthButton';
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

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="my-2">
    <Text className="font-medium text-2xl">{title}</Text>
    {children}
  </View>
);

export default function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const [faqVisible, setFaqVisible] = useState(false);
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();
  const navigation = useTicDriveNavigation();

  useEffect(() => {
    if (isEditing) {
      setEditedUser(user);
    }
  }, [isEditing]);

  const handleSaveProfile = async () => {
    setIsEditing(false);
  };

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', {favorite: true});
  };

  const handleChangeLanguage = (newLanguage: 'en' | 'it') => {
    setLanguage(newLanguage);
    alert(
      `Language changed to ${newLanguage === 'en' ? 'English' : 'Italian'}`,
    );
  };

  const handleFAQ = () => {
    navigationPush(navigation, 'FAQScreen');
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
          <View className="flex-row justify-between items-center mt-1 mb-4">
            <View className="flex-row items-center">
              <CircularUserAvatar
                uri={user?.imageurl}
                styles={{width: 70, height: 70, marginRight: 10}}
              />
              <View>
                {user?.name ? (
                  <Text className="font-semibold text-xl">{user?.name}</Text>
                ) : (
                  <Text className="font-base text-xl">
                    {'Edit to add your name'}
                  </Text>
                )}
              </View>
            </View>

            <View className="flex-row items-center self-start mt-4">
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => setIsEditing(!isEditing)}
              >
                <View className="flex-row items-center">
                  <EditIcon width={20} height={20} />
                  <Text className="text-green-600 font-medium ml-1">
                    {isEditing ? 'Save' : 'Edit'}
                  </Text>
                </View>
              </CrossPlatformButtonLayout>
            </View>
          </View>

          <HorizontalLine />

          <ScrollView
            className="px-1"
            contentContainerStyle={{paddingBottom: 140}}
          >
            <Section title="Account">
              <View className="flex-row items-center py-2">
                <PhoneIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.phoneNumber}
                    onChangeText={text =>
                      setEditedUser({...editedUser, phoneNumber: text})
                    }
                    placeholder="Insert phone number"
                  />
                ) : (
                  <Text className="text-base font-medium pl-1">
                    {user?.phoneNumber || 'Not available'}
                  </Text>
                )}
              </View>

              <HorizontalLine />

              <View className="flex-row items-center py-2">
                <MailIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.email}
                    onChangeText={text =>
                      setEditedUser({...editedUser, email: text})
                    }
                    placeholder="Insert emaik"
                  />
                ) : (
                  <Text className="text-base font-medium pl-1">
                    {user?.email || 'Not available'}
                  </Text>
                )}
              </View>

              <HorizontalLine />

              <View className="flex-row items-center py-2">
                <AddressIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.address}
                    onChangeText={text =>
                      setEditedUser({...editedUser, address: text})
                    }
                    placeholder="Insert address"
                  />
                ) : (
                  <Text className="text-base font-medium pl-1">
                    {user?.address || 'Not available'}
                  </Text>
                )}
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

              <CrossPlatformButtonLayout removeAllStyles onPress={handleFAQ}>
                <IconTextPair
                  text="FAQ"
                  icon={<FAQ />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              {faqVisible && renderFAQ()}
              <HorizontalLine />

              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() =>
                  setLanguageOptionsVisible(!languageOptionsVisible)
                }
              >
                <IconTextPair
                  text="Change language"
                  icon={<Translate />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              {languageOptionsVisible && (
                <View className="ml-8 mt-2">
                  <TouchableOpacity
                    className="py-2"
                    onPress={() => {
                      handleChangeLanguage('en');
                      setLanguageOptionsVisible(false);
                    }}
                  >
                    <Text
                      className={`text-base ${language === 'en' ? 'font-bold text-blue-600' : 'text-black'}`}
                    >
                      🇬🇧 English
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="py-2"
                    onPress={() => {
                      handleChangeLanguage('it');
                      setLanguageOptionsVisible(false);
                    }}
                  >
                    <Text
                      className={`text-base ${language === 'it' ? 'font-bold text-blue-600' : 'text-black'}`}
                    >
                      🇮🇹 Italian
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <HorizontalLine />

             
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
                onPress={() => handleLogout(dispatch, navigation)}
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
                onPress={() => alert('Eliminate account')}
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
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
