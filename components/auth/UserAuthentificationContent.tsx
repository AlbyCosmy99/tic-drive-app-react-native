import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserAuthenticationForm from '../forms/UserAuthenticationForm';
import TicDriveButton from '../ui/buttons/TicDriveButton';
import OAuth2Button from '../ui/buttons/OAuth2Button';
import GoogleIcon from '@/assets/svg/OAuth2Icons/GoogleIcon';
import AppleIcon from '@/assets/svg/OAuth2Icons/AppleIcon';
import {Colors} from '@/constants/Colors';
import React, {useState} from 'react';
import AuthAction from '@/types/auth/Action';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {useTranslation} from 'react-i18next';
import isScreenSmall from '@/services/responsive/isScreenSmall';
import {useGoogleAuth} from '@/hooks/auth/useGoogleAuth';
import axiosClient from '@/services/http/axiosClient';

interface UserAuthenticationContentProps {
  action: AuthAction;
  isUserRegistering: boolean;
  setIsUserRegistering: (isUserRegistering: boolean) => void;
}

const UserAuthenticationContent: React.FC<UserAuthenticationContentProps> = ({
  action,
  isUserRegistering,
  setIsUserRegistering,
}) => {
  const [loading, setLoading] = useState(false);
  const [onFormSubmit, setOnFormSubmit] = useState<(() => void) | null>(null);
  const navigation = useTicDriveNavigation();
  const {t} = useTranslation();

  const handleLoginPressed = async () => {
    onFormSubmit && onFormSubmit();
  };

  const handleSwitchLoginRegister = () => {
    setIsUserRegistering(!isUserRegistering);
  };

  const {signInWithGoogle} = useGoogleAuth(async googleIdToken => {
    setLoading(true);
    try {
      const {data} = await axiosClient.post('auth/google', {
        idToken: googleIdToken,
      });

      // // save JWT from backend
      // await SecureStore.setItemAsync('token', data.jwt);
      // // Redirect or update UI
    } catch (error) {
      console.error('Google Login failed:', error);
    } finally {
      setLoading(false);
    }
  });

  return loading ? (
    <View className="mt-40 flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    </View>
  ) : (
    <>
      <Text
        className={`text-center ${isScreenSmall() ? 'text-2xl' : 'text-3xl'} font-medium m-1.5 mb-3`}
      >
        {t('common.welcome')}
      </Text>
      <View className="flex-row justify-center gap-1">
        {action === 'login' ? (
          <Text className={`${isScreenSmall() && 'text-[13px]'}`}>
            {t('login.dont_have_account')}
          </Text>
        ) : (
          <Text className={`${isScreenSmall() && 'text-[13px]'}`}>
            {t('login.already_have_account')}
          </Text>
        )}
        <TouchableOpacity onPress={handleSwitchLoginRegister}>
          <Text
            className={`font-medium underline ${isScreenSmall() && 'text-[13px]'}`}
          >
            {action === 'login'
              ? t('login.register_here')
              : t('login.login_here')}
          </Text>
        </TouchableOpacity>
      </View>
      <View className={`flex-col ${!isScreenSmall() && 'mb-2'}`}>
        <UserAuthenticationForm
          isUserRegistering={isUserRegistering}
          setOnFormSubmit={setOnFormSubmit}
          setLoading={setLoading}
        />
        <CrossPlatformButtonLayout
          onPress={() => navigationPush(navigation, 'ForgotPasswordScreen')}
          containerTailwindCss="mx-8"
        >
          <Text
            className={`font-medium ${isScreenSmall() && 'text-[13px]'} self-end underline`}
          >
            {t('login.forgot_password')}
          </Text>
        </CrossPlatformButtonLayout>
      </View>
      <View>
        <TicDriveButton
          text={t(`login.${action}`)}
          onClick={handleLoginPressed}
        />
        <View className="flex-row justify-center items-center my-3.5">
          <View style={styles.hr} />
          <Text className="text-center" style={styles.continueWithText}>
            {t('login.or_continue_with')}
          </Text>
          <View style={styles.hr} />
        </View>
        <View className="flex-row mx-3.5">
          <OAuth2Button
            text="Google"
            icon={<GoogleIcon />}
            onPress={signInWithGoogle}
          />
        </View>
        <View className="flex-row justify-center gap-1 flex-wrap text-center mx-3.5 my-3 mb-8">
          <Text style={styles.footerText}>
            {t('login.by_clicking', {action: t(`login.${action}`)})}
          </Text>

          {/* termsOfUse */}
          <TouchableOpacity
            onPress={() =>
              navigationPush(navigation, 'LegalDocumentScreen', {
                type: 'termsOfUse',
              })
            }
          >
            <Text style={styles.link}>{t('login.termsOfUse')}</Text>
          </TouchableOpacity>

          {/* privacyPolicy */}
          <Text style={styles.footerText}>{t('login.and')}</Text>
          <TouchableOpacity
            onPress={() =>
              navigationPush(navigation, 'LegalDocumentScreen', {
                type: 'privacyPolicy',
              })
            }
          >
            <Text style={styles.link}>{t('login.privacy_policy')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1.5,
    margin: 10,
    flex: 1,
  },
  continueWithText: {
    color: Colors.light.placeholderText,
  },
  link: {
    color: 'black',
  },
  footerText: {
    color: Colors.light.placeholderText,
  },
});

export default UserAuthenticationContent;
