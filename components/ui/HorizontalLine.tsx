import {Colors} from '@/constants/Colors';
import React from 'react';
import {View} from 'react-native';

interface HorizontalLineProps {
  height?: number;
  color?: string;
  tailwindCssContainer?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  height = 1,
  color = Colors.light.lightGrey,
  tailwindCssContainer = '',
}) => {
  return (
    <View
      className={`w-full justify-center items-center ${tailwindCssContainer}`}
    >
      <View style={{height, backgroundColor: color}} className="w-full"></View>
    </View>
  );
};

export default HorizontalLine;
