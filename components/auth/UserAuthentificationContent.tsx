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
import ForgotPasswordModal from '../ui/modals/ForgotPasswordModal';

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
        Welcome
      </Text>
      <View className="flex-row justify-center gap-1">
        {action === 'login' ? (
          <Text>Don't have an account?</Text>
        ) : (
          <Text>Already have an account?</Text>
        )}
        <TouchableOpacity onPress={handleSwitchLoginRegister}>
          <Text className="font-medium">
            {action === 'login' ? 'Register' : 'Login'} here
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
          removeAllStyles
          onPress={() => setForgotPasswordVisible(true)}
          containerTailwindCss="mx-8"
        >
          <Text className="font-medium text-sm self-end">Forgot password?</Text>
        </CrossPlatformButtonLayout>
        <ForgotPasswordModal
          visible={forgotPasswordVisible}
          onDismiss={() => setForgotPasswordVisible(false)}
        />
      </View>
      <View>
        <TicDriveButton
          text={action[0].toUpperCase() + action.slice(1)}
          onClick={handleLoginPressed}
        />
        <View className="flex-row justify-center items-center my-3.5">
          <View style={styles.hr} />
          <Text className="text-center" style={styles.continueWithText}>
            Or continue with
          </Text>
          <View style={styles.hr} />
        </View>
        <View className="flex-row mx-3.5">
          <OAuth2Button text="Google" icon={<GoogleIcon />} />
          <OAuth2Button text="Apple ID" icon={<AppleIcon />} />
        </View>
        <View className="flex-row justify-center gap-1 flex-wrap text-center mx-3.5 my-3">
          <Text style={styles.footerText}>
            By clicking {action}, you agree to our
          </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>and</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Privacy Policy</Text>
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
