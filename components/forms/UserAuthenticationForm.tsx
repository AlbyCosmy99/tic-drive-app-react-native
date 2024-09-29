import * as React from "react";
import { Text, Button, StyleSheet } from "react-native";
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
    <ScrollView style={styles.container}>
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
                placeholder="name"
                isRightIcon={true}
                customValue={value}
                inputContainerStyle={styles.inputContainerStyle}
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
                  placeholder="Repeated password"
                  isRightIcon={true}
                  customValue={value}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              )}
            />
            {errors.repeatedPassword && <Text style={styles.error}>{errors.repeatedPassword.message}</Text>}
          </>
        )
      }

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
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
  }
});

export default UserAuthenticationForm
