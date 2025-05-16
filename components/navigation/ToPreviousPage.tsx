import {Colors} from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import React, {useContext} from 'react';
import {useColorScheme} from 'react-native';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import isScreenSmall from '@/services/responsive/isScreenSmall';

interface ToPreviousPageProps {
  containerClassName?: string;
}

const ToPreviousPage: React.FC<ToPreviousPageProps> = ({
  containerClassName = '',
}) => {
  const colorScheme = useColorScheme();
  const {navigation} = useContext(NavigationContext);

  return (
    <CrossPlatformButtonLayout
      onPress={() => navigation?.goBack()}
      containerTailwindCss={containerClassName}
      //todo: add accessibility to CrossPlatformButtonLayout
      // accessible={true}
      // accessibilityLabel="Back to previous page"
    >
      <Ionicons name="arrow-back" size={isScreenSmall() ? 28 : 30} color={Colors.white} />
    </CrossPlatformButtonLayout>
  );
};

export default ToPreviousPage;
