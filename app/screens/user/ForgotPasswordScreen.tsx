import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import isEmailValid from '@/utils/auth/isEmailValid';
import axios from 'axios';
import {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const {setErrorMessage} = useGlobalErrors();
  const navigation = useTicDriveNavigation();
  const [loading, setLoading] = useState(false);

  const buttonDisabled = useMemo(() => {
    return !email || !isEmailValid(email);
  }, [email]);

  const onClick = async () => {
    try {
      setLoading(true);
      await axiosClient.post('auth/forgot-password', {
        email,
      });
      setLoading(false);
      navigationPush(navigation, 'ResetPasswordWithCodeScreen', {email});
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          setErrorMessage(
            t('errors.badRequest', {message: e.response?.data?.message}),
          );
        } else if (e.response?.status === 401) {
          setErrorMessage(t('errors.unauthorized'));
        } else if (e.response?.status === 500) {
          setErrorMessage(t('errors.serverError'));
        } else {
          setErrorMessage(t('errors.unexpected', {code: e.response?.status}));
        }
      } else {
        console.error('Unknown error:', e.message);
        setErrorMessage(t('errors.general'));
      }
    }
  };

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      {loading ? (
        <TicDriveSpinner />
      ) : (
        <>
          <View className="mx-6 mt-10">
            <Text className="text-xl font-medium">
              {t('forgotPassword.title')}
            </Text>
            <Text className="text-base font-medium text-tic mr-4 mb-4 mt-1">
              {t('forgotPassword.description')}
            </Text>
            <Text className="font-base font-semibold my-0.5">
              {t('forgotPassword.emailLabel')}
            </Text>
          </View>
          <View className="mx-3">
            <TicDriveInput
              isRightIcon
              customValue={email}
              onChange={e => setEmail(e)}
              placeholder={t('forgotPassword.emailPlaceholder')}
              inputContainerStyle={{marginTop: 10}}
            />
          </View>
          <TicDriveButton
            disabled={buttonDisabled}
            text={t('forgotPassword.resetPasswordButton')}
            customDisabledStyle={{backgroundColor: '#B0E0C3'}}
            customButtonStyle={{height: 56, borderRadius: 12, marginTop: 24}}
            customTitleStyle={{fontWeight: 700}}
            customContainerStyle={{marginHorizontal: 24}}
            onClick={onClick}
          />
        </>
      )}
    </SafeAreaViewLayout>
  );
};

export default ForgotPasswordScreen;
