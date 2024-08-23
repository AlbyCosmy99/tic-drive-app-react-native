import React from "react";
import { Button } from '@rneui/themed';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from "@/constants/Colors";
import { useRouter, Href } from "expo-router";
interface TicDriveButtonProps {
  text: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  path: Href
}

const TicDriveButton: React.FC<TicDriveButtonProps> = ({ text, customButtonStyle, customContainerStyle, path }) => {
  const router = useRouter()
  return (
    <Button
        title={text}
        buttonStyle={[
          {
              borderRadius: 40,
              height: 60,
              backgroundColor: Colors.light.green.drive
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
        onPress={() => router.push(path)}
      />
  );
}

export default TicDriveButton;
