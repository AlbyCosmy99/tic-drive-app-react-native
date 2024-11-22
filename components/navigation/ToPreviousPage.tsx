import {Colors} from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {useColorScheme} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface ToPreviousPageProps {
  containerClassName?: string;
}

const ToPreviousPage: React.FC<ToPreviousPageProps> = ({
  containerClassName = '',
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className={containerClassName}
      accessible={true}
      accessibilityLabel="Back to previous page"
    >
      <Ionicons
        name="arrow-back"
        size={30}
        color={colorScheme === 'light' ? Colors.white : Colors.black}
      />
    </TouchableOpacity>
  );
};

export default ToPreviousPage;
