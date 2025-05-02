import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import VisibilityOffIcon from '@/components/svgs/access/VisibilityOff';
import VisibilityOnIcon from '@/components/svgs/access/VisibilityOn';
import isAcceptablePassword from '@/utils/auth/isAcceptablePassword';
import navigationReset from '@/services/navigation/reset';
import useLogin from '@/hooks/auth/useLogin';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import {useTranslation} from 'react-i18next';


const ChangePasswordScreen = () => {
  const {t} = useTranslation();

  type RootStackParamList = {
    ChangePasswordScreen: {email: string};
  };

  const route =
    useRoute<RouteProp<RootStackParamList, 'ChangePasswordScreen'>>();
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {setErrorMessage} = useGlobalErrors();
  const [loading, setLoading] = useState(false);
  const navigation = useTicDriveNavigation();
  const {login} = useLogin();

  const buttonDisabled = useMemo(() => {
    return (
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !isAcceptablePassword(password)
    );
  }, [password, confirmPassword]);

  const onClick = async () => {
    try {
      setLoading(true);
      await axiosClient.post('auth/reset-password', {
        email,
        newPassword: password,
        confirmPassword,
      });
      setLoading(false);
      navigationReset(navigation, 0, 'SuccessfullyPasswordChangedScreen');
      await login({
        email,
        category: 'user',
        password,
        repeatedPassword: confirmPassword,
      });
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          setErrorMessage(t('changePassword.error.badRequest', { message: e.response?.data?.message }));
        } else if (e.response?.status === 401) {
          setErrorMessage(t('changePassword.error.unauthorized'));
        } else if (e.response?.status === 500) {
          setErrorMessage(t('changePassword.error.serverError'));
        } else {
          setErrorMessage(t('changePassword.error.unexpected', { status: e.response?.status }));
        }
      } else {
        console.error('error:', e);
        setErrorMessage(t('changePassword.error.generic'));
        navigationReset(navigation, 0, 'ForgotPasswordScreen');
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
            <Text className="text-xl font-medium">{ t ('changePassword.setNewPassword')}</Text>
            <Text className="text-base font-medium text-tic mr-4 mb-4 mt-1">
            {t('changePassword.description')}

            </Text>
          </View>

          <View className="mx-6 mt-4">
            <TicDriveInput
              containerViewStyleTailwind="mt-4"
              placeholder={t('changePassword.password')}

              isRightIcon={true}
              customValue={password}
              onChange={e => setPassword(e)}
              inputContainerStyle={styles.inputContainerStyle}
              returnKeyType="send"
              isPassword={!isPasswordVisible}
              containerStyle={{height: 65}}
              rightIcon={
                isPasswordVisible ? (
                  <View className="mt-1">
                    <VisibilityOffIcon />
                  </View>
                ) : (
                  <VisibilityOnIcon />
                )
              }
              onRightIcon={() =>
                setIsPasswordVisible(previousValue => !previousValue)
              }
            />
            <TicDriveInput
              containerViewStyleTailwind="mt-4"
              placeholder= { t('changePassword.repeatPassword')}
              isRightIcon={true}
              customValue={confirmPassword}
              onChange={e => setConfirmPassword(e)}
              inputContainerStyle={styles.inputContainerStyle}
              returnKeyType="send"
              isPassword={!isPasswordVisible}
              containerStyle={{height: 65}}
              rightIcon={
                isPasswordVisible ? (
                  <View className="mt-1">
                    <VisibilityOffIcon />
                  </View>
                ) : (
                  <VisibilityOnIcon />
                )
              }
              onRightIcon={() =>
                setIsPasswordVisible(previousValue => !previousValue)
              }
            />
          </View>

          <TicDriveButton
            disabled={buttonDisabled}
            text={t('changePassword.updatePassword')}
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

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 0,
  },
});

export default ChangePasswordScreen;
