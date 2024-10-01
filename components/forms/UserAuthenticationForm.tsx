import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TicDriveInput from "../ui/inputs/TicDriveInput";
import { router, useNavigation } from "expo-router";
import { useAppDispatch } from "@/app/stateManagement/redux/hooks";
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";

import { saveLoginStatus } from "@/app/utils";
import { StackActions } from "@react-navigation/native";
import { login, setAreFormErrors } from "@/app/stateManagement/redux/slices/authSlice";

type FormData = {
  email: string;
  name?: string;
  password: string;
  repeatedPassword?: string;
};

interface UserAuthenticationFormProps {
  isUserRegistering: boolean;
  setOnFormSubmit: (onSubmit: () => void) => void;
}

const UserAuthenticationForm: React.FC<UserAuthenticationFormProps> = ({
  isUserRegistering,
  setOnFormSubmit
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const { setServicesChoosen, loginBtnCustomPath, setLoginBtnCustomPath } = React.useContext(GlobalContext);
  const navigation = useNavigation();
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const areThereErrors: boolean = !!(errors?.email || errors?.name || errors?.password || errors?.repeatedPassword);
    dispatch(setAreFormErrors(areThereErrors));
  }, [errors?.email, errors?.name, errors?.password, errors?.repeatedPassword]);

  
  React.useEffect(() => {
    clearErrors()
  }, [isUserRegistering])
  
  const onSubmit =async (data: FormData) => {
    dispatch(login({
      name: "Andrei",
      surname: "Albu"
    }))
    
    await saveLoginStatus(true)
    //sostituire con react-thunk

    setServicesChoosen([]);
    if (loginBtnCustomPath) {
        if (navigation.canGoBack()) {
            navigation.dispatch(StackActions.popToTop());
        }
        router.replace(loginBtnCustomPath);
        setLoginBtnCustomPath(undefined);
    } else if (navigation.canGoBack()) {
        navigation.goBack();
    } else {
        router.replace('/');
    }
  };

  React.useEffect(() => {
    setOnFormSubmit(() => handleSubmit(onSubmit))
  }, [])

  return (
    <View style={[styles.container, isUserRegistering && styles.containerUserRegistering]}>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value, onBlur } }) => (
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

     {
      isUserRegistering && (
        <>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value, onBlur } }) => (
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
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        </>
      )
     } 

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TicDriveInput 
            placeholder="Password"
            isRightIcon={true}
            customValue={value}
            onChange={onChange}
            inputContainerStyle={styles.inputContainerStyle}
            returnKeyType="send"
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {
        isUserRegistering && (
          <>
            <Controller
              control={control}
              name="repeatedPassword"
              rules={{ 
                required: "Repeated password is required",
                validate: (value) => value === control._getWatch("password") || "Passwords do not match"
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TicDriveInput 
                  placeholder="Repeat password"
                  isRightIcon={true}
                  customValue={value}
                  onChange={onChange}
                  inputContainerStyle={styles.inputContainerStyle}
                  returnKeyType="send"
                />
              )}
            />
            {errors.repeatedPassword && <Text style={styles.error}>{errors.repeatedPassword.message}</Text>}
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 30,
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#fdd",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputContainerStyle: {
    marginTop: 0,
  },
  containerUserRegistering: {
    paddingBottom: 0
  }
});

export default UserAuthenticationForm
