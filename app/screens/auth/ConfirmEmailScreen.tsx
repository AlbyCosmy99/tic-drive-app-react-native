import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import TicDriveAuthButton from '@/components/ui/buttons/TicDriveAuthButton';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveModal from '@/components/ui/modals/TicDriveModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import isEmailConfirmed from '@/services/http/requests/auth/isEmailConfirmed';
import sendConfirmationEmail from '@/services/http/requests/auth/sendConfirmationEmail';
import navigationReset from '@/services/navigation/reset';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const ConfirmEmailScreen = () => {
  const [loadingSendConfirmationEmail, setLoadingConfirmationEmail] =
    useState(false);
  const [loadingCheckIsEmailConfirmed, setLoadingCheckIsEmailConfirmed] =
    useState(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [emailCheckedModalOpened, setEmailCheckedModalOpened] = useState(false);
  const user = useAppSelector(state => state.auth.user);
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
  const {t} = useTranslation();

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
            {t('confirmEmail.welcome', {name: user?.name})}
          </Text>
          <Text className="text-lg font-bold text-center mb-4">
            {t('confirmEmail.pleaseConfirm')}
          </Text>
          <Text className="text-sm text-center text-gray-600 mb-4">
            {t('confirmEmail.instructions')}
          </Text>
          <View className="h-6">
            {loadingSendConfirmationEmail ? (
              <TicDriveSpinner />
            ) : (
              <CrossPlatformButtonLayout onPress={handleResendEmail}>
                <Text className="underline text-md">
                  {t('confirmEmail.resendButton')}
                </Text>
              </CrossPlatformButtonLayout>
            )}
          </View>
          <View className="h-12 mt-6">
            {loadingCheckIsEmailConfirmed ? (
              <TicDriveSpinner />
            ) : (
              <TicDriveButton
                text={t('confirmEmail.confirmedButton')}
                onClick={handleCheckConfirmation}
                customContainerStyle={{margin: 0}}
              />
            )}
          </View>
        </View>
        <TicDriveAuthButton action="logout" />

        {/* confirmation email sent modal */}
        <TicDriveModal
          title={t('confirmEmail.modal1Title')}
          content={t('confirmEmail.modal1Content')}
          visible={confirmModalOpened}
          cancelText=""
          confirmText={t('confirmEmail.modal1Confirm')}
          onClose={() => setConfirmModalOpened(false)}
        />

        {/* check is email confirmed modal */}
        <TicDriveModal
          title={t('confirmEmail.modal2Title')}
          content={t('confirmEmail.modal2Content')}
          visible={emailCheckedModalOpened}
          cancelText=""
          confirmText={t('confirmEmail.modal2Confirm')}
          onClose={() => setEmailCheckedModalOpened(false)}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
};

export default ConfirmEmailScreen;
