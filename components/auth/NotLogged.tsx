import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {Text, View} from 'react-native';
import TicDriveAuthButton from '../ui/buttons/TicDriveAuthButton';
import {useTranslation} from 'react-i18next';

const NotLogged = () => {
  const {t} = useTranslation();

  return (
    <LinearGradientViewLayout>
      <View className="items-center justify-center flex-1">
        <Text className="font-medium text-lg mb-2">
          {t('auth.not_logged_in')}
        </Text>
        <Text className="font-medium text-md mb-4">
          {t('auth.login_or_register')}
        </Text>
        <TicDriveAuthButton action="login" />
      </View>
    </LinearGradientViewLayout>
  );
};

export default NotLogged;
