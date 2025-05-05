import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserAuthenticationForm from '../forms/UserAuthenticationForm';
import TicDriveButton from '../ui/buttons/TicDriveButton';
import OAuth2Button from '../ui/buttons/OAuth2Button';
import GoogleIcon from '@/assets/svg/OAuth2Icons/GoogleIcon';
import AppleIcon from '@/assets/svg/OAuth2Icons/AppleIcon';
import {Colors} from '@/constants/Colors';
import React, {useState} from 'react';
import {UserCategory} from '@/types/User';
import AuthAction from '@/types/auth/Action';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import { useTranslation } from 'react-i18next';


interface UserAuthenticationContentProps {
  action: AuthAction;
  isUserRegistering: boolean;
  setIsUserRegistering: (isUserRegistering: boolean) => void;
  clientCategory?: UserCategory;
}

const UserAuthenticationContent: React.FC<UserAuthenticationContentProps> = ({
  action,
  isUserRegistering,
  setIsUserRegistering,
  clientCategory = 'user',
}) => {
  const [loading, setLoading] = useState(false);
  const [onFormSubmit, setOnFormSubmit] = useState<(() => void) | null>(null);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const navigation = useTicDriveNavigation();
  const { t } = useTranslation();

  const handleLoginPressed = async () => {
    onFormSubmit && onFormSubmit();
  };

  const handleSwitchLoginRegister = () => {
    setIsUserRegistering(!isUserRegistering);
  };

  return loading ? (
    <View className="mt-40 flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    </View>
  ) : (
    <>
      <Text className="text-center text-3xl font-medium m-1.5 mb-3">
      {t('common.welcome')}
      </Text>
      <View className="flex-row justify-center gap-1">
        {action === 'login' ? (
          <Text>{t('login.dont_have_account')}
</Text>
        ) : (
          <Text>{t('login.already_have_account')}</Text>
        )}
        <TouchableOpacity onPress={handleSwitchLoginRegister}>
          <Text className="font-medium">
          {action === 'login' ? t('login.register_here') : t('login.login_here')}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col mb-2">
        <UserAuthenticationForm
          isUserRegistering={isUserRegistering}
          setOnFormSubmit={setOnFormSubmit}
          clientCategory={clientCategory}
          setLoading={setLoading}
        />
        <CrossPlatformButtonLayout
          onPress={() => navigationPush(navigation, 'ForgotPasswordScreen')}
          containerTailwindCss="mx-8"
        >
          <Text className="font-medium text-sm self-end">{t('login.forgot_password')}</Text>
        </CrossPlatformButtonLayout>
      </View>
      <View>
        <TicDriveButton
          text={action[0].toUpperCase() + action.slice(1)}
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
          <OAuth2Button text="Google" icon={<GoogleIcon />} />
          <OAuth2Button text="Apple ID" icon={<AppleIcon />} />
        </View>
        <View className="flex-row justify-center gap-1 flex-wrap text-center mx-3.5 my-3 mb-8">
        <Text style={styles.footerText}>
           {t('login.by_clicking', { action: t(`login.${action}`) })}
           </Text>
          <TouchableOpacity onPress={() => navigationPush(navigation, 'TermAndConditionScreen')}>
        <Text style={styles.link}>{t('login.terms_of_use')}</Text>
         </TouchableOpacity>
         <Text style={styles.footerText}>{t('login.and')}</Text>
        <TouchableOpacity onPress={() => navigationPush(navigation, 'PrivacyPolicyScreen')}>
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
