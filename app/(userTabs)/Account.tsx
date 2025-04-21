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
import LogoutModal from '@/components/modal/LogoutModal';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View className="my-4">
    <Text className="font-semibold text-xl mb-2">{title}</Text>
    {children}
  </View>
);

export default function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();
  const navigation = useTicDriveNavigation();

  useEffect(() => {
    if (isEditing) {
      setEditedUser(user);
    }
  }, [isEditing, user]);

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

  const toggleLanguageOptions = () =>
    setLanguageOptionsVisible(prev => !prev);

  const handleChangeLanguage = (newLanguage: 'en' | 'it') => {
    setLanguage(newLanguage);
    alert(`Language changed to ${newLanguage === 'en' ? 'English' : 'Italian'}`);
  };

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', { favorite: true });
  };

  const handleFAQ = () => {
    navigationPush(navigation, 'FAQScreen');
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

  if (!token) {
    return (
      <LinearGradientViewLayout>
        <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
          <TicDriveNavbar />
          <NotLogged />
        </SafeAreaViewLayout>
      </LinearGradientViewLayout>
    );
  }

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar />
        <View className="mx-3 mt-4">
          {/* Profile Header */}
          <View className="flex-row justify-between items-center mt-1 mb-4">
          <View className="flex-row items-center">
              <CircularUserAvatar
                uri={user?.imageurl}
                styles={{ width: 70, height: 70, marginRight: 12 }}
              />
              <View>
                {isEditing ? (
                  <TextInput
                    className="font-semibold text-xl ml-2"
                    value={editedUser.name || ''}
                    onChangeText={text =>
                      setEditedUser({ ...editedUser, name: text })
                    }
                    placeholder="Enter your name"
                  />
                ) : (
                  <Text className="font-semibold text-xl">
                    {user?.name || 'Edit to add your name'}
                  </Text>
                )}
              </View>
            </View>
            {/* Edit/Save Button */}
            <View className="self-start mt-4">
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => {
                  isEditing ? handleSaveProfile() : setIsEditing(true);
                }}
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

          <HorizontalLine />

          <ScrollView className="px-1" contentContainerStyle={{ paddingBottom: 140 }}>
            {/* Account Section */}
            <Section title="Account">
              {/* Phone */}
              <View className="flex-row items-center py-3">
                <PhoneIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.phoneNumber || ''}
                    onChangeText={text =>
                      setEditedUser({ ...editedUser, phoneNumber: text })
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

              {/* Email */}
              <View className="flex-row items-center py-3">
                <MailIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.email || ''}
                    onChangeText={text =>
                      setEditedUser({ ...editedUser, email: text })
                    }
                    placeholder="Insert email"
                  />
                ) : (
                  <Text className="text-base font-medium pl-1">
                    {user?.email || 'Not available'}
                  </Text>
                )}
              </View>
              <HorizontalLine />

              {/* Address */}
              <View className="flex-row items-center py-3">
                <AddressIcon />
                {isEditing ? (
                  <TextInput
                    className="ml-2 flex-1 border-b border-gray-300 pb-1"
                    value={editedUser.address || ''}
                    onChangeText={text =>
                      setEditedUser({ ...editedUser, address: text })
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

              {/* Vehicles */}
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

              {/* Favorite Workshops */}
              <CrossPlatformButtonLayout removeAllStyles onPress={onFavoriteWorkshops}>
                <IconTextPair
                  text="Favorite workshops"
                  icon={<HeartIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
            </Section>

            {/* Help and Support Section */}
            <Section title="Help and support">
              {/* Change Language */}
              <CrossPlatformButtonLayout removeAllStyles onPress={toggleLanguageOptions}>
                <IconTextPair
                  text="Change language"
                  icon={<Translate />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>

              {/* Language Options */}
              {languageOptionsVisible && (
                <View className="ml-8 mt-2">
                  {(['en', 'it'] as const).map(lng => (
                    <TouchableOpacity
                      key={lng}
                      className="py-2"
                      onPress={() => {
                        handleChangeLanguage(lng);
                        setLanguageOptionsVisible(false);
                      }}
                    >
                      <Text
                        className={`text-base ${language === lng ? 'font-bold text-blue-600' : 'text-black'}`}
                      >
                        {lng === 'en' ? '🇬🇧 English' : '🇮🇹 Italian'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <HorizontalLine />

              {/* FAQ */}
              <CrossPlatformButtonLayout removeAllStyles onPress={handleFAQ}>
                <IconTextPair
                  text="FAQ"
                  icon={<FAQ />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />

              {/* Customer Support */}
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

              {/* Logout */}
              <CrossPlatformButtonLayout removeAllStyles onPress={() => setShowLogoutModal(true)}>
                <IconTextPair
                  text="Logout"
                  icon={<Logout />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0 pt-1"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />

              {/* Delete Account */}
              <CrossPlatformButtonLayout removeAllStyles onPress={handleDeleteAccount}>
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

        {/* Logout Confirmation Modal */}
        <LogoutModal
          visible={showLogoutModal}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout(dispatch, navigation);
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
