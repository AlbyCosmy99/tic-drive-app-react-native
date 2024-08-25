import React, { useContext } from "react";
import { Button } from '@rneui/themed';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from "@/constants/Colors";
import { useRouter, Href } from "expo-router";
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";

interface TicDriveButtonProps {
  text: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  path: Href;
}

const TicDriveButton: React.FC<TicDriveButtonProps> = ({
  text,
  customButtonStyle,
  customContainerStyle,
  path,
}) => {
  const router = useRouter();
  const { servicesChoosen, carNotFound, setWorkshopFilter } = useContext(GlobalContext);

  const whenDisabled: Record<string, boolean> = {
    "book a service": servicesChoosen.length === 0,
    "confirm": carNotFound, 
  };

  return (
    <Button
      title={text}
      disabled={whenDisabled[text.toLowerCase() ?? false]}
      buttonStyle={[
        {
          borderRadius: 40,
          height: 60,
          backgroundColor: Colors.light.green.drive,
        },
        customButtonStyle,
      ]}
      containerStyle={[
        {
          margin: 15,
          marginBottom: 0,
        },
        customContainerStyle,
      ]}
      onPress={() => {
        router.push(path)
        if(text.toLowerCase() === 'confirm') {
          setWorkshopFilter('')
        }
      }}
    />
  );
};

export default TicDriveButton;
