import React from 'react';
import {View, Text} from 'react-native';

interface IconTextPairProps {
  text?: string;
  icon?: React.ReactNode;
  containerTailwindCss?: string;
  textTailwindCss?: string;
  iconContainerTailwindCss?: string;
  reverseIcon?: boolean;
}

const IconTextPair: React.FC<IconTextPairProps> = ({
  text,
  icon,
  containerTailwindCss = '',
  textTailwindCss = '',
  iconContainerTailwindCss = '',
  reverseIcon = false,
}) => {
  return (
    text && (
      <View
        className={`flex flex-row items-center gap-1.5 py-3 ${containerTailwindCss}`}
      >
        {!reverseIcon && (
          <View
            className={`flex items-center justify-center w-5 h-5 ${iconContainerTailwindCss}`}
          >
            {icon}
          </View>
        )}
        <Text className={`${textTailwindCss}`}>{text}</Text>
        {reverseIcon && (
          <View className="flex items-center justify-center w-5 h-5">
            {icon}
          </View>
        )}
      </View>
    )
  );
};

export default IconTextPair;
