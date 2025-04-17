import React from 'react';
import {View, Text} from 'react-native';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import PinLocationIcon from '@/assets/svg/location/PinLocation.svg';

export default function LocationPin() {
  const userAddress = useAppSelector(state => state.auth.user?.address) ?? '';

  return (
    <View className="flex-row items-center px-4 pt-1 pb-1">
      <PinLocationIcon width={16} height={16} />
      <Text
        className="ml-1 text-sm font-medium text-gray-700"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {userAddress}
      </Text>
    </View>
  );
}
