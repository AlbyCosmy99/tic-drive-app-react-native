import * as React from "react";
import { Text, Button, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import TicDriveInput from "../ui/inputs/TicDriveInput";

type FormData = {
  email: string;
  name?: string;
  password: string;
  repeatedPassword?: string;
};

interface UserAuthenticationFormProps {
  isUserRegistering: boolean;
}

const UserAuthenticationForm: React.FC<UserAuthenticationFormProps> = ({
  isUserRegistering,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

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
              rules={{ required: "Repeated password is required" }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TicDriveInput 
                  placeholder="Repeat password"
                  isRightIcon={true}
                  customValue={value}
                  inputContainerStyle={styles.inputContainerStyle}
                  returnKeyType="send"
                />
              )}
            />
            {errors.repeatedPassword && <Text style={styles.error}>{errors.repeatedPassword.message}</Text>}
          </>
        )
      }

      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
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
    marginBottom: 10,
  },
  inputContainerStyle: {
    marginTop: 0,
  },
  containerUserRegistering: {
    paddingBottom: 0
  }
});

export default UserAuthenticationForm
