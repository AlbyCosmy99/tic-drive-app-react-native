import {Colors} from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ToPreviousPageProps {
  containerClassName?: string;
}

const ToPreviousPage: React.FC<ToPreviousPageProps> = ({
  containerClassName = '',
}) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
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
