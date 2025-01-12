import Car from '@/types/Car';
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
    <View className="flex flex-row mb-1">
      <View className="flex-1">
        <Text className="text-base font-medium text-tic ">{title}:</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium">{value}</Text>
      </View>
    </View>
  );
};

export default RegistrationCarDetailCard;
