/*
README: login cannot be available if there is a rightContent node passed as prop
this is because the login button is the default right content, and if the prop
right content is given, this will override the default node
*/

import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '@/constants/Colors';
import {StackActions} from '@react-navigation/native';
import ToPreviousPage from './ToPreviousPage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useContext} from 'react';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationReplace from '@/services/navigation/replace';
import TicDriveAuthButton from '../ui/buttons/TicDriveAuthButton';
import navigationPush from '@/services/navigation/push';
import useJwtToken from '@/hooks/auth/useJwtToken';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';

interface TicDriveNavbarProps {
  isLoginAvailable?: boolean;
  canGoBack?: boolean;
  topContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onRightContent?: () => void;
}

const TicDriveNavbar: React.FC<TicDriveNavbarProps> = ({
  isLoginAvailable = true,
  canGoBack = null,
  topContent,
  rightContent,
  onRightContent = () => {},
}) => {
  const colorScheme = useColorScheme();
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const {navigation} = useContext(NavigationContext);

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'light'
        ? Colors.light.background
        : Colors.dark.background,
  };

  return (
    <View
      className={`flex-row items-center ${!isLoginAvailable ? 'justify-center' : 'justify-between'} px-2.5 h-14`}
      style={backgroundStyle}
    >
      <View className="flex-1 justify-start flex-row">
        {navigation?.canGoBack() && (canGoBack || canGoBack === null) && (
          <ToPreviousPage />
        )}
      </View>
      {!topContent ? (
        <TouchableWithoutFeedback
          onPress={() => {
            if (navigation?.canGoBack()) {
              navigation.dispatch(StackActions.popToTop());
            }
            dispatch(reset());
            navigationReplace(navigation, 'Hub');
          }}
          className="flex-row flex-1 justify-center items-center"
        >
          <Text
            className="font-bold text-3xl"
            style={[styles.title, styles.ticText]}
          >
            Tic
          </Text>
          <Text
            className="font-bold text-3xl"
            style={[styles.title, styles.driveText]}
          >
            Drive
          </Text>
        </TouchableWithoutFeedback>
      ) : (
        topContent
      )}
      <View className="flex-1 justify-end flex-row">
        {!rightContent ? (
          isLoginAvailable &&
          (token ? (
            <TicDriveAuthButton action="logout" />
          ) : (
            <TicDriveAuthButton
              onPress={() => {
                navigationPush(navigation, 'UserAuthenticationScreen');
              }}
              action="login"
            />
          ))
        ) : (
          <CrossPlatformButtonLayout removeAllStyles onPress={onRightContent}>
            {rightContent}
          </CrossPlatformButtonLayout>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
  },
  ticText: {
    color: Colors.light.ticText,
  },
  driveText: {
    color: Colors.light.green.drive,
  },
  login: {
    color: Colors.light.text,
  },
});

export default TicDriveNavbar;
