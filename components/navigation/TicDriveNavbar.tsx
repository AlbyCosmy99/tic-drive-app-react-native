import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '@/constants/Colors';
import {router, useNavigation} from 'expo-router';
import {StackActions} from '@react-navigation/native';
import ToPreviousPage from './ToPreviousPage';
import TicDriveAuthButton from '../ui/buttons/TicDriveAuthButton';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '@/stateManagement/redux/hooks';
import { reset } from '@/stateManagement/redux/slices/servicesSlice';
interface TicDriveNavbarProps {
  isLoginAvailable?: boolean;
  canGoBack?: boolean;
}

const TicDriveNavbar: React.FC<TicDriveNavbarProps> = ({
  isLoginAvailable = true,
  canGoBack = null,
}) => {
  const colorScheme = useColorScheme();
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigation = useNavigation()

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
        {canGoBack ||
          (canGoBack === null && navigation?.canGoBack() && <ToPreviousPage />)}
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (navigation?.canGoBack()) {
            navigation.dispatch(StackActions.popToTop());
          }
          dispatch(reset());
          router.replace('/?animation=fade');
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
      <View className="flex-1 justify-end flex-row">
        {isLoginAvailable &&
          (isUserLogged ? (
            <TicDriveAuthButton action="logout" />
          ) : (
            <TicDriveAuthButton
              onPress={() => {
                router.push('../../screens/UserAuthenticationScreen');
              }}
              action="login"
            />
          ))}
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
