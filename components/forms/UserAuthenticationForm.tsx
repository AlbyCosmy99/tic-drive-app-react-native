import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import TicDriveInput from '../ui/inputs/TicDriveInput';
import User, {UserCategory} from '@/types/User';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import {setToken, login} from '@/stateManagement/redux/slices/authSlice';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import navigationReset from '@/services/navigation/reset';
import navigationReplace from '@/services/navigation/replace';
import register from '@/services/auth/register';
import {setSecureToken} from '@/services/auth/secureStore/setToken';
import {login as authLogin} from '@/services/auth/login';
import {getPayload} from '@/services/auth/getPayload';
import getUserData from '@/utils/auth/getUserData';
import ErrorModal from '../ui/modals/ErrorModal';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';

type FormData = {
  email: string;
  name?: string;
  password: string;
  repeatedPassword?: string;
};

interface UserAuthenticationFormProps {
  isUserRegistering: boolean;
  setOnFormSubmit: (onSubmit: () => void) => void;
  clientCategory: UserCategory;
  setLoading: (loading: boolean) => void;
}

const UserAuthenticationForm: React.FC<UserAuthenticationFormProps> = ({
  isUserRegistering,
  setOnFormSubmit,
  clientCategory,
  setLoading,
}) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: {errors},
  } = useForm<FormData>();

  const {loginRouteName, setLoginRouteName, loginRouteParams} =
    React.useContext(AuthContext);
  const {navigation} = React.useContext(NavigationContext);
  const dispatch = useAppDispatch();
  const {setErrorMessage} = React.useContext(GlobalContext);

  React.useEffect(() => {
    clearErrors();
  }, [isUserRegistering, clearErrors]);

  const onSubmit = async (data: FormData, isUserRegistering: boolean) => {
    const user: User = {
      name: data.name,
      email: data.email,
      category: clientCategory === 'user' ? 'user' : 'workshop',
      password: data.password,
      repeatedPassword: data.repeatedPassword,
    };

    if (isUserRegistering) {
      try {
        setLoading(true);
        const res = await register(user);
        setSecureToken(res.token);
        dispatch(setToken(res.token));
        navigationReset(navigation, 0, 'ConfirmEmailScreen');
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await authLogin(user);
        console.log(res);
        setSecureToken(res.token);
        dispatch(setToken(res.token));
        const payload = await getPayload(res.token);
        dispatch(login(getUserData(payload)));

        if (res.emailConfirmed) {
          if (loginRouteName) {
            navigationReset(navigation, 0, loginRouteName, loginRouteParams);
            setLoginRouteName('');
          } else if (navigation?.canGoBack()) {
            navigationReplace(navigation, 'Hub');
          } else {
            navigationPush(navigation, 'Hub');
          }
        } else {
          navigationReset(navigation, 0, 'ConfirmEmailScreen');
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    setOnFormSubmit(() =>
      handleSubmit(data => onSubmit(data, isUserRegistering)),
    );
  }, [isUserRegistering, handleSubmit, setOnFormSubmit]);

  return (
    <View
    className='pb-0'
      style={[
        styles.container,
        isUserRegistering && styles.containerUserRegistering,
      ]}
    >
      {isUserRegistering && (
        <>
          <Controller
            control={control}
            name="name"
            rules={{required: 'Name is required'}}
            render={({field: {onChange, value}}) => (
              <TicDriveInput
                placeholder="Name"
                isRightIcon={true}
                customValue={value}
                onChange={onChange}
                inputContainerStyle={styles.inputContainerStyle}
                returnKeyType="send"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}
        </>
      )}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Please enter a valid email address',
          },
        }}
        render={({field: {onChange, value}}) => (
          <TicDriveInput
            placeholder="Email"
            isRightIcon={true}
            customValue={value}
            onChange={onChange}
            inputContainerStyle={styles.inputContainerStyle}
            returnKeyType="send"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password must be at least 8 characters long, include letters (at least one uppercase), numbers, and at least one special character',
          },
        }}
        render={({field: {onChange, value}}) => (
          <TicDriveInput
            placeholder="Password"
            isRightIcon={true}
            customValue={value}
            onChange={onChange}
            inputContainerStyle={styles.inputContainerStyle}
            returnKeyType="send"
            isPassword={true}
            containerStyle={{height: 65}}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {isUserRegistering && (
        <>
          <Controller
            control={control}
            name="repeatedPassword"
            rules={{
              required: 'Repeated password is required',
              validate: value =>
                value === watch('password') || 'Passwords do not match',
            }}
            render={({field: {onChange, value}}) => (
              <TicDriveInput
                placeholder="Repeat password"
                isRightIcon={true}
                customValue={value}
                onChange={onChange}
                inputContainerStyle={styles.inputContainerStyle}
                returnKeyType="send"
                isPassword={true}
              />
            )}
          />
          {errors.repeatedPassword && (
            <Text style={styles.error}>{errors.repeatedPassword.message}</Text>
          )}
        </>
      )}

      <ErrorModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  error: {
    color: 'red',
    marginBottom: 30,
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fdd',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputContainerStyle: {
    marginTop: 0
  },
  containerUserRegistering: {
    paddingBottom: 0,
  },
});

export default UserAuthenticationForm;
