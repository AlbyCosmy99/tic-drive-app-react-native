import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import TicDriveInput from '../ui/inputs/TicDriveInput';
import {saveUser} from '@/services/auth/secureStore/user';
import User, {UserCategory} from '@/types/User';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import {
  login,
  setAreFormErrors,
} from '@/stateManagement/redux/slices/authSlice';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationPush from '@/services/navigation/push';
import navigationReset from '@/services/navigation/reset';
import navigationReplace from '@/services/navigation/replace';
import register from '@/services/auth/register';
import { login as authLogin } from '@/services/auth/login';
import { setToken } from '@/services/auth/secureStore/setToken';

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
}

const UserAuthenticationForm: React.FC<UserAuthenticationFormProps> = ({
  isUserRegistering,
  setOnFormSubmit,
  clientCategory,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    watch,
    formState: {errors},
  } = useForm<FormData>();

  const {setIsUserLogged, loginRouteName, setLoginRouteName, loginRouteParams} =
    React.useContext(AuthContext);
  const {navigation} = React.useContext(NavigationContext);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const areThereErrors: boolean = !!(
      errors?.email ||
      errors?.name ||
      errors?.password ||
      errors?.repeatedPassword
    );
    dispatch(setAreFormErrors(areThereErrors));
  }, [errors?.email, errors?.name, errors?.password, errors?.repeatedPassword]);

  React.useEffect(() => {
    clearErrors();
  }, [isUserRegistering]);

  const onSubmit = async (data: FormData, isUserRegistering: boolean) => {
    setIsUserLogged(true);
  
    const user: User = {
      name: data.name,
      email: data.email,
      category: clientCategory === 'user' ? 'user' : 'workshop',
      password: data.password,
      repeatedPassword: data.repeatedPassword,
    };

    if (isUserRegistering) {
      try {
        const res = await register(user)

        setToken(res.token)
        //to-do:salvare il token in redux per accesso facilitato e piu veloce rispetto a SecureStore

        navigationReset(navigation,0,'ConfirmEmailScreen')
        return
      } catch(err) {
        console.error("Registration error:", err);
          
        dispatch(setAreFormErrors(true));

        alert('We encountered an issue. Please try again.');
        return
      }
    } else {
      try {
        const res = await authLogin(user)
        saveUser(user);
        setToken(res.token)
        navigationReset(navigation,0,'ConfirmEmailScreen')
        //to-do:salvare il token in redux per accesso facilitato e piu veloce rispetto a SecureStore
        //chiamata fetch per payload e conferma mail
        //se confermata home, altrimenti pagina conferma email

      } catch(err) {
        console.error("Login error:", err);
          
        dispatch(setAreFormErrors(true));

        alert('We encountered an issue. Please try again.');
        return
      }
    }

    // Clear sensitive data
    user.password = "";
    user.repeatedPassword = "";

    dispatch(login(user));

    if (loginRouteName) {
      navigationReset(navigation, 0, loginRouteName, loginRouteParams);
      setLoginRouteName('');
    } else if (navigation?.canGoBack()) {
      navigationReplace(navigation, 'Hub');
    } else {
      navigationPush(navigation, 'Hub');
    }
  };
  

  React.useEffect(() => {
    setOnFormSubmit(() => {
      return handleSubmit(data => {
        onSubmit(data, isUserRegistering);
      });
    });
  }, [isUserRegistering]);

  return (
    <View
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
            render={({field: {onChange, value, onBlur}}) => (
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
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //is an email
            message: 'Please enter a valid email address',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
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
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password must be at least 8 characters long, include letters, numbers, and at least one special character',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TicDriveInput
            placeholder="Password"
            isRightIcon={true}
            customValue={value}
            onChange={onChange}
            inputContainerStyle={styles.inputContainerStyle}
            returnKeyType="send"
            isPassword={true}
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
            render={({field: {onChange, value, onBlur}}) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
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
    marginTop: 0,
  },
  containerUserRegistering: {
    paddingBottom: 0,
  },
});

export default UserAuthenticationForm;
