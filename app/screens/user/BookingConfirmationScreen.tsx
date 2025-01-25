import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, Text, View} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import CheckIcon from '@/assets/svg/check_circle.svg';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import formatCurrentDate from '@/utils/dates/FormatCurrentDate';
import PaymentConfirmationCard from '@/components/ui/cards/payment/PaymentConfirmationCard';
import {useRoute} from '@react-navigation/native';
import Workshop from '@/types/workshops/Workshop';
import {useMemo} from 'react';

export default function BookingConfirmationScreen() {
  const dispatch = useAppDispatch();

  const route = useRoute();
  const {workshop, date, time} = route?.params as {
    workshop: Workshop;
    date: string;
    time: string;
  };

  const timeDate = useMemo(() => time + ', ' + date, [date, time]);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaViewLayout styles={[styles.container]}>
        <View className="flex-1 justify-center items-center mx-2.5">
          <CheckIcon height={60} width={60} />
          <Text className="font-bold text-2xl mt-2">Payment confirmed!</Text>
          <Text className="text-tic text-base text-center">
            Your service needs confirmation from the workshop.
          </Text>
          <View className="flex flex-col items-center justify-center mt-4 mb-6">
            <Text className="text-sm text-tic">Booking# 00806835</Text>
            <Text className="text-sm text-tic">{formatCurrentDate()}</Text>
          </View>
          <PaymentConfirmationCard workshop={workshop} timeDate={timeDate} />
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
      </SafeAreaViewLayout>
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
