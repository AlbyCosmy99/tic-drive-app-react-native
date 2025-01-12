import React from 'react';
import {View, Text} from 'react-native';

interface IconTextPairProps {
  text: string;
  icon: React.ReactNode;
  containerTailwindCss?: string;
  textTailwindCss?: string;
}

const IconTextPair: React.FC<IconTextPairProps> = ({
  text,
  icon,
  containerTailwindCss = '',
  textTailwindCss = '',
}) => {
  return (
    <View
      className={`flex flex-row items-center gap-2 py-3 ${containerTailwindCss}`}
    >
      <View className="flex items-center justify-center w-5 h-5">{icon}</View>
      <Text className={`${textTailwindCss}`}>{text}</Text>
    </View>
  );
};

export default IconTextPair;
