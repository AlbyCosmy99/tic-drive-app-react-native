import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import ErrorModal from '@/components/ui/modals/ErrorModal';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useMemo, useState} from 'react';
import {Text, View} from 'react-native';

const ChangePasswordScreen = () => {
  type RootStackParamList = {
    ChangePasswordScreen: {email: string};
  };

  const route =
    useRoute<RouteProp<RootStackParamList, 'ChangePasswordScreen'>>();
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {setErrorMessage} = useGlobalErrors();
  const [loading, setLoading] = useState(false);
  const navigation = useTicDriveNavigation();

  const buttonDisabled = useMemo(() => {
    return true;
  }, []);

  const onClick = async () => {
    try {
      setLoading(true);
      await axiosClient.post('auth/reset-password', {
        email,
        password,
        confirmPassword,
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
        console.error('aa:', e);
        setErrorMessage('Codice errato. Riprova');
      }
    }
  };

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View className="mx-6 mt-10">
            <Text className="text-xl font-medium">Set a new password</Text>
            <Text className="text-base font-medium text-tic mr-4 mb-4 mt-1">
              Create a new password. Ensure it differs from previous ones for
              security.
            </Text>
          </View>

          <View className="mx-6 mt-4">
            <Text>pass</Text>
            <Text>confirm pass</Text>
          </View>

          <TicDriveButton
            disabled={buttonDisabled}
            text="Update password"
            customDisabledStyle={{backgroundColor: '#B0E0C3'}}
            customButtonStyle={{height: 56, borderRadius: 12, marginTop: 24}}
            customTitleStyle={{fontWeight: 700}}
            customContainerStyle={{marginHorizontal: 24}}
            onClick={onClick}
          />
        </>
      )}
      <ErrorModal />
    </SafeAreaViewLayout>
  );
};

export default ChangePasswordScreen;
