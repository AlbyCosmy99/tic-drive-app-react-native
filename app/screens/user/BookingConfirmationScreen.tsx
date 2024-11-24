import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {globalStyles} from '@/styles/globalStyles';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';

export default function BookingConfirmationScreen() {
  const dispatch = useAppDispatch();
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaView
        style={[styles.container, globalStyles().safeAreaView]}
        className="flex-1"
      >
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="flex-1 justify-center items-center">
          <Text
            style={styles.success}
            className="font-extrabold text-center p-5 pt-0 text-3xl"
          >
            Service booked successfully!
          </Text>
          <Text
            style={styles.success}
            className="font-extrabold text-center p-5 pt-0 text-3xl"
          >
            Thank you for booking with TicDrive. You will soon receive a PIN
            code via email to present to the mechanic.
          </Text>
        </View>
        <TicDriveButton
          replace={true}
          toTop={true}
          text="Home"
          routeName="userTabs"
          routeParams={{animation: 'fade'}}
          stateRouteName="Home"
          onClick={() => {
            dispatch(reset());
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  success: {
    color: Colors.light.ticText,
  },
});
