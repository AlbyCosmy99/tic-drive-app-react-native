import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import ErrorModal from '@/components/ui/modals/ErrorModal';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useMemo, useState} from 'react';
import {Text, View} from 'react-native';

const ResetPasswordWithCodeScreen = () => {
  type RootStackParamList = {
    ResetPasswordWithCodeScreen: {email: string};
  };

  const route =
    useRoute<RouteProp<RootStackParamList, 'ResetPasswordWithCodeScreen'>>();
  const {email} = route.params;
  const {setErrorMessage} = useGlobalErrors();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const navigation = useTicDriveNavigation();

  const buttonDisabled = useMemo(() => {
    return code.length !== 6;
  }, [code]);

  const onClick = async () => {
    try {
      setLoading(true);
      await axiosClient.post('auth/send-code-password-forgot', {
        email,
        code,
      });
      setLoading(false);
      navigationPush(navigation, 'ChangePasswordScreen', {email});
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
      <View className="mx-6 mt-10">
        <Text className="text-xl font-medium">Check your email</Text>
        <Text className="text-base font-medium text-tic mr-4 mb-4 mt-1">
          Abbiamo inviato un link di reimpostazione a {email.toLowerCase()}.
          Inserisci il codice a 6 cifre menzionato nell'email.
        </Text>
      </View>

      <View className="mx-6 mt-4">
        <TicDriveInput
          customValue={code}
          onChange={setCode}
          placeholder="Inserisci codice"
          keyboardType="number-pad"
          maxLength={6}
          textContentType="oneTimeCode"
          inputContainerStyle={{marginTop: 10}}
        />
      </View>

      <TicDriveButton
        disabled={buttonDisabled}
        text="Verifica codice"
        customDisabledStyle={{backgroundColor: '#B0E0C3'}}
        customButtonStyle={{height: 56, borderRadius: 12, marginTop: 24}}
        customTitleStyle={{fontWeight: 700}}
        customContainerStyle={{marginHorizontal: 24}}
        onClick={onClick}
      />
      <ErrorModal />
    </SafeAreaViewLayout>
  );
};

export default ResetPasswordWithCodeScreen;
