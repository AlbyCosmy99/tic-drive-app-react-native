import { StyleSheet, View } from "react-native";
import { Icon, Input } from '@rneui/themed';
import { Colors } from "@/constants/Colors";
import React, { memo, useContext, useState } from 'react';
import {Car} from '../../../constants/temp/Cars'
import cars from "../../../constants/temp/Cars";
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import defaultCar from "@/constants/defaultRegistrationCar";

interface TicDriveInputProps {
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  placeholder: string;
  setCarSelected?: (carSelected: Car) => void;
  option?: string,
  setIsCarSearched?: (carSearched: boolean) => void
}

const TicDriveInput: React.FC<TicDriveInputProps> = ({ 
  isLeftIcon = false, 
  isRightIcon = false, 
  placeholder, 
  setCarSelected,
  option = "plateNumber", //car registration default option
  setIsCarSearched = () => {},
}) => {

  const [value, setValue] = useState<string>('');
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext)

  type CarKeys = 'vin' | 'plateNumber' | 'model' //car registration options

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
      setIsCarSearched(false)
    }
    setWorkshopFilter('')
  };

  const handleSubmitEditing = () => {
    if (value && setCarSelected) {
      const car = cars.find(car => car[option as CarKeys]?.toLowerCase().trim() === value.toLowerCase().trim());
      setCarSelected(car ? car : defaultCar);
      setIsCarSearched(true)
    }
  };

  return (
    <View className={!setCarSelected ? "flex-1 justify-center items-center" : ''}>
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
          setValue(setCarSelected ? text.toUpperCase() : text)
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
