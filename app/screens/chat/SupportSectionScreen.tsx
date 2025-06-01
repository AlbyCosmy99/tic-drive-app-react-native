import {Text, View, Linking, TouchableOpacity, Alert} from 'react-native';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import PhoneIcon from '@/assets/svg/notifications/phone.svg';
import MailIcon from '@/assets/svg/notifications/mail.svg';
import {useTranslation} from 'react-i18next';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';

export default function SupportScreen() {
  const {t} = useTranslation();
  const {setErrorMessage} = useGlobalErrors();

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setErrorMessage(t('errors.cannotOpenURL'));
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'Unknown error');
    }
  };

  const options = [
    {
      icon: <MailIcon width={24} height={24} />,
      label: t('supports.email_us'),
      onPress: () => handleOpenLink('mailto:albu.cosminandrei.1999@gmail.com'),
    },
    {
      icon: <PhoneIcon width={24} height={24} />,
      label: t('supports.call_support'),
      onPress: () => handleOpenLink('tel:+393335911852'),
    },
  ];

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />

        <View className="items-center mt-6 px-4">
          <Text
            allowFontScaling={false}
            className="text-2xl font-semibold text-center text-black font-poppins"
          >
            {t('supports.title')}
          </Text>
          <Text
            allowFontScaling={false}
            className="text-lg mt-1 text-center text-gray-700 font-poppins"
          >
            {t('supports.subtitle')}
          </Text>
        </View>

        <View className="px-4 mt-6 space-y-3">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              className="flex-row items-center bg-white rounded-xl shadow-sm px-4 py-4 border border-gray-100"
              accessibilityRole="button"
              accessibilityLabel={option.label}
            >
              <View className="mr-4">{option.icon}</View>
              <Text
                allowFontScaling={false}
                className="text-base text-black font-poppins"
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-10 items-center px-4">
          <Text
            allowFontScaling={false}
            className="text-base text-center text-gray-800 font-poppins"
          >
            {t('supports.footer_message')}
          </Text>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
