import {Colors} from '@/constants/Colors';
import React from 'react';
import {View} from 'react-native';

interface HorizontalLineProps {
  height?: number;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({height = 1}) => {
  return (
    <View className="w-full justify-center items-center">
      <View
        style={{height, width: '100%', backgroundColor: Colors.light.ticText}}
      ></View>
    </View>
  );
};

export default HorizontalLine;
