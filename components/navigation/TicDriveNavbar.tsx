/*
README: login cannot be available if there is a rightContent node passed as prop
this is because the login button is the default right content, and if the prop
right content is given, this will override the default node
*/

import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Colors';
import {StackActions} from '@react-navigation/native';
import ToPreviousPage from './ToPreviousPage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {useContext} from 'react';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationReplace from '@/services/navigation/replace';
import TicDriveAuthButton from '../ui/buttons/TicDriveAuthButton';
import navigationPush from '@/services/navigation/push';
import useJwtToken from '@/hooks/auth/useJwtToken';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import isScreenSmall from '@/services/responsive/isScreenSmall';
import {setServices} from '@/stateManagement/redux/slices/bookingSlice';

interface TicDriveNavbarProps {
  isLoginAvailable?: boolean;
  canGoBack?: boolean;
  topContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onRightContent?: () => void;
  containerTailwindCss?: string;
}

const TicDriveNavbar: React.FC<TicDriveNavbarProps> = ({
  isLoginAvailable = false,
  canGoBack = null,
  topContent,
  rightContent,
  onRightContent = () => {},
  containerTailwindCss = '',
}) => {
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const {navigation} = useContext(NavigationContext);

  const backgroundStyle = {
    backgroundColor: Colors.light.background,
  };

  return (
    <View
      className={`flex-row items-center ${!isLoginAvailable ? 'justify-center' : 'justify-between'} px-2.5 h-14 ${containerTailwindCss}`}
      style={backgroundStyle}
    >
      {/* Left section (Back button) */}
      <View className="flex-1 justify-start flex-row">
        {navigation?.canGoBack() && (canGoBack || canGoBack === null) && (
          <ToPreviousPage />
        )}
      </View>

      {/* Center logo or top content */}
      {!topContent ? (
        <TouchableWithoutFeedback
          onPress={() => {
            if (navigation?.canGoBack()) {
              navigation.dispatch(StackActions.popToTop());
            }
            dispatch(setServices([]));
            navigationReplace(navigation, 'Hub');
          }}
          className="flex-row flex-1 justify-center items-center"
        >
          <Text
            allowFontScaling={false}
            className={`font-bold ${isScreenSmall() ? 'text-2xl' : 'text-3xl'}`}
            style={[styles.title, styles.ticText]}
          >
            Tic
          </Text>
          <Text
            allowFontScaling={false}
            className={`font-bold ${isScreenSmall() ? 'text-2xl' : 'text-3xl'}`}
            style={[styles.title, styles.driveText]}
          >
            Drive
          </Text>
        </TouchableWithoutFeedback>
      ) : (
        topContent
      )}

      {/* Right section (login/logout or custom button) */}
      <View className="flex-1 justify-end flex-row flex-wrap">
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
          <CrossPlatformButtonLayout onPress={onRightContent}>
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
});

export default TicDriveNavbar;
