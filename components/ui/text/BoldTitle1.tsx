import {Colors} from '@/constants/Colors';
import React from 'react';
import {Text, useColorScheme} from 'react-native';

interface BoldTitle1Props {
  title: string;
}

const BoldTitle1: React.FC<BoldTitle1Props> = ({title}) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        color: Colors.light.text,
      }}
      className="font-medium mb-2 text-2xl mx-3.5"
    >
      {title}
    </Text>
  );
};

export default BoldTitle1;
