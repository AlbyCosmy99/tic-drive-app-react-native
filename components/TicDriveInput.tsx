import { StyleSheet, Text, View } from "react-native";
import { Icon, Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import React, { useState } from 'react';

interface TicDriveInputProps {
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  placeholder: string;
}

const TicDriveInput: React.FC<TicDriveInputProps> = ({ isLeftIcon = false, isRightIcon = false, placeholder }) => {
  const [value, setValue] = useState<string>('');

  return (
    <View style={styles.inputWrapper}>
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
                    onPress={() => setValue('')}
                  />
              ) : undefined
            }
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            placeholderTextColor="#8b8b8b"
            value={value}
            onChangeText={(text) => setValue(text)}
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
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicDriveInput;
