import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import TicDriveAuthButton from '@/components/ui/buttons/TicDriveAuthButton';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveModal from '@/components/ui/modals/TicDriveModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useLogin from '@/hooks/auth/useLogin';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import isEmailConfirmed from '@/services/http/requests/auth/isEmailConfirmed';
import sendConfirmationEmail from '@/services/http/requests/auth/sendConfirmationEmail';
import navigationReset from '@/services/navigation/reset';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const ConfirmEmailScreen = () => {
  const [loadingSendConfirmationEmail, setLoadingConfirmationEmail] =
    useState(false);
  const [loadingCheckIsEmailConfirmed, setLoadingCheckIsEmailConfirmed] =
    useState(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [emailCheckedModalOpened, setEmailCheckedModalOpened] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const {login} = useLogin();
  const navigation = useTicDriveNavigation();

  const handleResendEmail = async () => {
    try {
      setLoadingConfirmationEmail(true);
      await sendConfirmationEmail(user?.email);
    } catch (e) {
    } finally {
      setLoadingConfirmationEmail(false);
      setConfirmModalOpened(true);
    }
  };

  const handleCheckConfirmation = async () => {
    try {
      setLoadingCheckIsEmailConfirmed(true);
      await isEmailConfirmed(user?.email);
      navigationReset(navigation, 0, 'Hub', 'Home');
    } catch (e) {
      setEmailCheckedModalOpened(true);
    } finally {
      setLoadingCheckIsEmailConfirmed(false);
    }
  };
  useEffect(() => {
    if (user?.emailConfirmed) {
    }
  }, [user]);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <TicDriveNavbar />
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-3xl font-medium m-1.5 mb-3">
            Welcome {user?.name}!
          </Text>
          <Text className="text-lg font-bold text-center mb-4">
            Please confirm your email address.
          </Text>
          <Text className="text-sm text-center text-gray-600 mb-4">
            We have sent a confirmation email to your registered address. Please
            check your inbox (and spam folder) and click the confirmation link
            to activate your account.
          </Text>
          <View className="h-6">
            {loadingSendConfirmationEmail ? (
              <TicDriveSpinner />
            ) : (
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={handleResendEmail}
              >
                <Text className="underline text-md">
                  Resend Confirmation Email
                </Text>
              </CrossPlatformButtonLayout>
            )}
          </View>
          <View className="h-12 mt-6">
            {loadingCheckIsEmailConfirmed ? (
              <TicDriveSpinner />
            ) : (
              <TicDriveButton
                text="I confirmed the email"
                onClick={handleCheckConfirmation}
                customContainerStyle={{margin: 0}}
              />
            )}
          </View>
        </View>
        <TicDriveAuthButton action="logout" />

        {/* confirmation email sent modal */}
        <TicDriveModal
          title="Confirmation email sent"
          content="Check your email"
          visible={confirmModalOpened}
          cancelText=""
          confirmText="Great"
          onClose={() => setConfirmModalOpened(false)}
        />

        {/* check is email confirmed modal */}
        <TicDriveModal
          title="Check your email"
          content="Your email is not confirmed yet. Check your email or resend it pressing the 'Resend Confirmation Email' button."
          visible={emailCheckedModalOpened}
          cancelText=""
          confirmText="Ok"
          onClose={() => setEmailCheckedModalOpened(false)}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
};

export default ConfirmEmailScreen;
