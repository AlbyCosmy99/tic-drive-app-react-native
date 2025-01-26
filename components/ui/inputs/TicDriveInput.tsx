import {
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import {Colors} from '@/constants/Colors';
import React, {memo, useState} from 'react';

interface TicDriveInputProps {
  placeholder: string;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  onRightIcon?: () => void;
  onSubmit?: (value: string) => void;
  isTextUppercase?: boolean;
  containerViewStyleTailwind?: string;
  customValue?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  returnKeyType?: ReturnKeyTypeOptions;
  onChange?: (text: string) => void;
  isPassword?: boolean;
}

const TicDriveInput: React.FC<TicDriveInputProps> = ({
  isLeftIcon = false,
  isRightIcon = false,
  onRightIcon,
  placeholder,
  onSubmit,
  isTextUppercase = false,
  containerViewStyleTailwind = '',
  customValue = '',
  containerStyle,
  inputContainerStyle = {},
  returnKeyType = 'default',
  isPassword = false,
  onChange,
}) => {
  const [value, setValue] = useState<string>(customValue);

  const handleOnPress = () => {
    setValue('');
    onRightIcon && onRightIcon();
    onChange && onChange('');
  };

  const handleSubmitEditing = () => {
    onSubmit && onSubmit(value);
  };

  return (
    <View
      className={containerViewStyleTailwind && containerViewStyleTailwind}
    >
      <Input
        placeholder={placeholder}
        leftIcon={
          isLeftIcon ? (
            <Icon name="search" size={24} color={Colors.light.ticText} />
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
        containerStyle={containerStyle}
        inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
        inputStyle={styles.inputText}
        placeholderTextColor="#8b8b8b"
        value={value}
        onChangeText={text => {
          setValue(isTextUppercase ? text.toUpperCase() : text);
          onChange && onChange(text.trim());
        }}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType={returnKeyType}
        secureTextEntry={isPassword}
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
