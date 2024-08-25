import { StyleSheet, Text, View } from "react-native";
import { Icon, Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import React, { useState } from 'react';
import {Car} from '../constants/temp/Cars'
import cars from "../constants/temp/Cars";


interface TicDriveInputProps {
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  placeholder: string;
  setCarSelected?: (carSelected: Car) => void;
  option?: keyof Car,
  setIsCarSearched: (carSearched: boolean) => void
}

const TicDriveInput: React.FC<TicDriveInputProps> = ({ 
  isLeftIcon = false, 
  isRightIcon = false, 
  placeholder, 
  setCarSelected,
  option = "plateNumber",
  setIsCarSearched,
}) => {
  const [value, setValue] = useState<string>('');

  const defaultCar = {
    id: 0,
    liters: 0,
    energy: "",
    engineCode: "",
    enginePower: 0,
    engineDisplacement: 0,
    vin: "",
    plateNumber: "",
    model: ""
  }

  const handleOnPress = () => {
    setValue('');
    if (setCarSelected) {
      setCarSelected({
        id: 0,
        liters: 0,
        energy: "",
        engineCode: "",
        enginePower: 0,
        engineDisplacement: 0,
        vin: "",
        plateNumber: "",
        model: ""
      });
    }
    setIsCarSearched(false)
  };

  const handleSubmitEditing = () => {
    if (value && setCarSelected) {
      const car = cars.find(car => typeof car[option] === 'string' && car[option]?.toLowerCase() === value.toLowerCase())
      setCarSelected(car ? car : defaultCar);
      setIsCarSearched(true)
    }
  };

  return (
    <View style={!setCarSelected && styles.inputWrapper}>
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
        onChangeText={(text) => setValue(setCarSelected ? text.toUpperCase() : text)}
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
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicDriveInput;
