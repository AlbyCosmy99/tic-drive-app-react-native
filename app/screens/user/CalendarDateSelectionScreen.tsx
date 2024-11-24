import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {globalStyles} from '@/styles/globalStyles';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';

export default function CalendarDateSelectionScreen() {
  const {setLoginRouteName} = useContext(AuthContext);
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaView
        className="flex-1 justify-between"
        style={globalStyles().safeAreaView}
      >
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="items-center justify-center flex-1">
          <Text>select date and hour</Text>
        </View>
        <TicDriveButton
          text={'Confirm ' + (!isUserLogged ? 'and login' : '')}
          routeName={
            isUserLogged
              ? 'BookingConfirmationScreen'
              : 'UserAuthenticationScreen'
          }
          routeParams={isUserLogged ? {} : {isUser: true}}
          toTop={isUserLogged ? true : false}
          replace={isUserLogged ? true : false}
          onClick={
            isUserLogged
              ? () => {}
              : () => setLoginRouteName('BookingConfirmationScreen')
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
