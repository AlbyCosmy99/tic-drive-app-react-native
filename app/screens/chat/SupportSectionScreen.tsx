import React from 'react';
import {Text, View, Linking, TouchableOpacity} from 'react-native';

import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';

import PhoneIcon from '@/assets/svg/notifications/phone.svg';
import MailIcon from '@/assets/svg/notifications/mail.svg';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export default function SupportScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const options = [
    {
      icon: <MailIcon width={24} height={24} />,
      label: t('supports.email_us'),
      onPress: () => Linking.openURL('mailto:albu.cosminandrei.1999@gmail.com'),
    },
    {
      icon: <PhoneIcon width={24} height={24} />,
      label: t('supports.call_support'),
      onPress: () => Linking.openURL('tel:+393335911852'),
    },
  ];

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />

        <View className="items-center mt-6 px-4">
          <Text className="text-2xl font-semibold text-center text-black font-poppins">
            {t('supports.title')}
          </Text>
          <Text className="text-lg mt-1 text-center text-gray-700 font-poppins">
            {t('supports.subtitle')}
          </Text>
        </View>

        <View className="px-4 mt-6 space-y-3">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              className="flex-row items-center bg-white rounded-xl shadow-sm px-4 py-4 border border-gray-100"
            >
              <View className="mr-4">{option.icon}</View>
              <Text className="text-base text-black font-poppins">
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-10 items-center px-4">
          <Text className="text-base text-center text-gray-800 font-poppins">
            {t('supports.footer_message')}
          </Text>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
