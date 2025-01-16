import {Colors} from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import React, {useContext} from 'react';
import {useColorScheme} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {router} from 'expo-router';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';

interface ToPreviousPageProps {
  containerClassName?: string;
}

const ToPreviousPage: React.FC<ToPreviousPageProps> = ({
  containerClassName = '',
}) => {
  const colorScheme = useColorScheme();
  const {navigation} = useContext(NavigationContext);

  return (
    <TouchableOpacity
      onPress={() => navigation?.goBack()}
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
