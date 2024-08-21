import React from "react";
import { Button } from '@rneui/themed';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from "@/constants/Colors";

interface TicDriveButtonProps {
  text: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
}

const TicDriveButton: React.FC<TicDriveButtonProps> = ({ text, customButtonStyle, customContainerStyle }) => {
  return (
    <Button
      title={text}
      buttonStyle={[
        {
            borderRadius: 40,
            height: 60,
            backgroundColor: Colors.green.drive
        },
        customButtonStyle
      ]}
      containerStyle={[
        {
          margin: 15,
          marginBottom: 0
        },
        customContainerStyle
      ]}
    />
  );
}

export default TicDriveButton;
