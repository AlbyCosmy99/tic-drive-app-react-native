import React from 'react';
import {View, Text, TextProps} from 'react-native';

interface IconTextPairProps {
  text?: string;
  icon?: React.ReactNode;
  containerTailwindCss?: string;
  textTailwindCss?: string;
  iconContainerTailwindCss?: string;
  reverseIcon?: boolean;
  textProps?: TextProps; // allow custom accessibility or scaling control
}

const IconTextPair: React.FC<IconTextPairProps> = ({
  text,
  icon,
  containerTailwindCss = '',
  textTailwindCss = '',
  iconContainerTailwindCss = '',
  reverseIcon = false,
  textProps = {},
}) => {
  if (!text?.trim()) return null;

  return (
    <View
      className={`flex flex-row items-center gap-1.5 py-3 ${containerTailwindCss}`}
      accessibilityRole="text"
      accessibilityLabel={text}
    >
      {!reverseIcon && (
        <View
          className={`flex items-center justify-center w-5 h-5 ${iconContainerTailwindCss}`}
        >
          {icon}
        </View>
      )}
      <Text
        className={'mr-2 ' + textTailwindCss}
        numberOfLines={3}
        ellipsizeMode="tail"
        allowFontScaling={false}
        {...textProps}
      >
        {text}
      </Text>
      {reverseIcon && (
        <View className="flex items-center justify-center w-5 h-5">{icon}</View>
      )}
    </View>
  );
};

export default IconTextPair;
