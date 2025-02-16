import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, TextInputProps, View} from 'react-native';
import TicDriveInput from './TicDriveInput';
import React, {useEffect, useState} from 'react';

interface TicDriveTextOrInputProps {
  value: any;
  setValue: (value: any) => void;
  title: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  errorMessage?: string;
  isErrorMessage?: boolean;
  setIsErrorMessage?: (isErrorMessage: boolean) => void;
  onCheckError?: () => boolean
}

const TicDriveTextOrInput: React.FC<TicDriveTextOrInputProps> = ({
  value,
  setValue,
  placeholder = 'Insert value',
  title,
  keyboardType = 'default',
  errorMessage = '',
  isErrorMessage = false,
  setIsErrorMessage = () => {},
  onCheckError= () => false
}) => {
  return (
    <View className="my-1 border-b mx-3" style={styles.carDetailContainer}>
      <Text className="font-bold mb-0.5 text-lg">{title}</Text>
      {value ? (
        <Text className="text-lg mb-1.5">{value}</Text>
      ) : (
        <>
        <TicDriveInput
          placeholder={placeholder}
          customValue={value}
          onChange={text => setValue(text)}
          isRightIcon
          onRightIcon={() => setIsErrorMessage(false)}
          keyboardType={keyboardType}
          returnKeyType='done'
          containerStyle={{height: 85}}
          onSubmit={() => setIsErrorMessage(onCheckError())}
        />
          {isErrorMessage && <Text className='font-medium text-md text-red-500 text-center mb-2'>{errorMessage}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carDetailContainer: {
    borderBottomColor: Colors.light.extremelyLightGrey,
  },
});

export default TicDriveTextOrInput;
