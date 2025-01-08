import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, View} from 'react-native';
import TicDriveInput from './TicDriveInput';
import React, {useEffect, useState} from 'react';

interface TicDriveTextOrInputProps {
  value: any;
  setValue: (value: any) => void;
  title: string;
  placeholder: string;
}

const TicDriveTextOrInput: React.FC<TicDriveTextOrInputProps> = ({
  value,
  setValue,
  placeholder = 'Insert value',
  title,
}) => {
  return (
    <View className="my-1 border-b mx-3" style={styles.carDetailContainer}>
      <Text className="font-bold mb-0.5 text-lg">{title}</Text>
      {value ? (
        <Text className="text-lg mb-1.5">{value}</Text>
      ) : (
        <TicDriveInput
          placeholder={placeholder}
          customValue={value}
          onChange={text => setValue(text)}
          isRightIcon
        />
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
