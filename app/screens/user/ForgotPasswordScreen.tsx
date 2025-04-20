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

const ForgotPasswordScreen = () => {
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
          setErrorMessage('Bad request: ' + e.response?.data?.message);
        } else if (e.response?.status === 401) {
          setErrorMessage('Unauthorized: Please check your credentials.');
        } else if (e.response?.status === 500) {
          setErrorMessage('Server error. Please try again later.');
        } else {
          setErrorMessage('Unexpected error: ' + e.response?.status);
        }
      } else {
        console.error('Unknown error:', e.message);
        setErrorMessage(e.message);
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
            <Text className="text-xl font-medium">Password dimenticata?</Text>
            <Text className="text-base font-medium text-tic mr-4 mb-4 mt-1">
              Inserisci la tua email per reimpostare la password
            </Text>
            <Text className="font-base font-semibold my-0.5">Your email</Text>
          </View>
          <View className="mx-3">
            <TicDriveInput
              isRightIcon
              customValue={email}
              onChange={e => setEmail(e)}
              placeholder="Insert your email"
              inputContainerStyle={{marginTop: 10}}
            />
          </View>
          <TicDriveButton
            disabled={buttonDisabled}
            text="Reimposta password"
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
