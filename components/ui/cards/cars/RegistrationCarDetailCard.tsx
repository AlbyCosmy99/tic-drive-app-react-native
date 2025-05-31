import React from 'react';
import {Text, View} from 'react-native';

interface RegistrationCarDetailCardProps {
  title: string;
  value: string;
}

const RegistrationCarDetailCard: React.FC<RegistrationCarDetailCardProps> = ({
  title,
  value,
}) => {
  return (
    <View className="flex flex-row mb-1 items-start">
      <View className="flex-1 pr-1">
        <Text
          className="text-base font-medium text-tic"
          allowFontScaling={false}
        >
          {title}:
        </Text>
      </View>
      <View className="flex-1 pl-1">
        <Text
          className="text-base font-medium text-gray-800"
          allowFontScaling={false}
        >
          {value?.trim() ? value : '—'}
        </Text>
      </View>
    </View>
  );
};

export default RegistrationCarDetailCard;
