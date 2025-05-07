import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import CheckIcon from '@/assets/svg/check_circle.svg';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {
  reset,
  setServicesChoosenByUsers,
} from '@/stateManagement/redux/slices/servicesSlice';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import formatCurrentDate from '@/utils/dates/FormatCurrentDate';
import PaymentConfirmationCard from '@/components/ui/cards/payment/PaymentConfirmationCard';
import {useRoute} from '@react-navigation/native';
import {useContext, useEffect, useMemo, useState} from 'react';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import axiosClient from '@/services/http/axiosClient';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import {t} from 'i18next';

export default function BookingConfirmationScreen() {
  const dispatch = useAppDispatch();

  const {setCarSelectedByMakeAndModel} = useContext(CarContext);

  const route = useRoute();
  const {date, time} = route?.params as {
    date: string;
    time: string;
  };

  const workshop = useAppSelector(state => state.workshops.selectedWorkshop);
  const carSelected = useAppSelector(state => state.cars.selectedCar);

  const [
    loadingCarRegistrationConfirmation,
    setLoadingCarRegistrationConfirmation,
  ] = useState(true);

  const timeDate = useMemo(() => time + ', ' + date, [date, time]);

  const onConfirmToHome = () => {
    dispatch(reset());
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel(undefined);
    }
  };

  const user = useAppSelector(state => state.auth.user);
  const languageCode = useAppSelector(state => state.language.languageCode);
  const token = useAppSelector(state => state.auth.token);

  const {setErrorMessage} = useContext(GlobalContext);

  const confirmCarSelected = async () => {
    try {
      setLoadingCarRegistrationConfirmation(true);
      await axiosClient.post(
        'cars',
        {
          name:
            languageCode === 'it'
              ? `La ${carSelected?.make} ${carSelected?.model} di ${user?.name}`
              : `${user?.name}'s ${carSelected?.make} ${carSelected?.model}`,
          plate: carSelected?.plateNumber,
          make: carSelected?.make,
          model: carSelected?.model,
          year: carSelected?.year,
          fuelType: carSelected?.fuel,
          transmissionType: carSelected?.transmission,
          engineDisplacement: carSelected?.engineDisplacement,
          km: carSelected?.mileage,
          cv: carSelected?.powerCV,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (e: any) {
      setErrorMessage(t('bookingConfirmation.errorCarRegistration'));
    } finally {
      setLoadingCarRegistrationConfirmation(false);
    }
  };

  useEffect(() => {
    dispatch(
      setServicesChoosenByUsers({
        id: 1,
        title: t('service.oilChange'),
        description: t('service.oilChange'),
        icon: 'https://img.icons8.com/dotty/80/car-service.png',
      }),
    );

    confirmCarSelected();
  }, []);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaViewLayout styles={[styles.container]}>
        {loadingCarRegistrationConfirmation ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              size="large"
              color={Colors.light.bookingsOptionsText}
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center mx-2.5">
            <CheckIcon height={60} width={60} />
            <Text className="font-bold text-2xl mt-2">
              {t('bookings.confirmed')}!
            </Text>
            <Text className="text-tic text-base text-center">
              {t('bookingConfirmation.awaitingWorkshopConfirmation')}
            </Text>
            <View className="flex flex-col items-center justify-center mt-4 mb-6">
              <Text className="text-sm text-tic">
                {t('bookingConfirmation.bookingNumber', {number: '00806835'})}
              </Text>
              <Text className="text-sm text-tic">{formatCurrentDate()}</Text>
            </View>
            <PaymentConfirmationCard
              workshop={workshop}
              timeDate={timeDate}
              type={t('bookingConfirmation.statusPending')}
            />
          </View>
        )}
        <TicDriveButton
          replace={true}
          toTop={true}
          text={t('common.home')}
          routeName="userTabs"
          routeParams={{animation: 'fade'}}
          stateRouteName="Home"
          onClick={onConfirmToHome}
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
