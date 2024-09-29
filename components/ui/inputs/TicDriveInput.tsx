import { StyleSheet, View } from "react-native";
import { Icon, Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import React, { memo, useContext, useState } from 'react';
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";

interface TicDriveInputProps {
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  onRightIcon?: () => void;
  placeholder: string;
  onSubmit?: (value: string) => void;
  isTextUppercase?: boolean;
  containerViewStyleTailwind?: string;
}

const TicDriveInput: React.FC<TicDriveInputProps> = ({ 
  isLeftIcon = false, 
  isRightIcon = false, 
  onRightIcon,
  placeholder, 
  onSubmit,
  isTextUppercase = false,
  containerViewStyleTailwind = ""
}) => {

  const [value, setValue] = useState<string>('');
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext)

  const handleOnPress = () => {
    setValue('');
    onRightIcon && onRightIcon()
    setWorkshopFilter('')
  };

  const handleSubmitEditing = () => {
    onSubmit && onSubmit(value);
  };

  return (
    <View className={containerViewStyleTailwind && containerViewStyleTailwind}>
      <Input
        placeholder={placeholder}
        leftIcon={
          isLeftIcon ? (
            <Icon
              name="search"
              size={24}
              color={Colors.light.ticText}
            />
          ) : undefined
        }
        rightIcon={
          isRightIcon && value ? (
            <Icon
              name="cancel"
              size={24}
              color={Colors.light.ticText}
              onPress={handleOnPress}
            />
          ) : undefined
        }
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholderTextColor="#8b8b8b"
        value={value}
        onChangeText={(text) => {
          setValue(isTextUppercase ? text.toUpperCase() : text)
          setWorkshopFilter(text)
        }}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#efefef',
    borderRadius: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    marginTop: 20,
    height: 55,
    width: '100%',
  },
  inputText: {
    color: Colors.light.text,
    fontSize: 18,
    marginLeft: 8,
  },
});

export default memo(TicDriveInput);
