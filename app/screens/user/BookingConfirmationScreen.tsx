import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, Text, View} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import CheckIcon from '@/assets/svg/check_circle.svg';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import formatCurrentDate from '@/utils/dates/FormatCurrentDate';
import {useContext, useMemo} from 'react';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import {t} from 'i18next';
import {reset} from '@/stateManagement/redux/slices/bookingSlice';
import BookingCard from '@/components/ui/cards/bookings/BookingCard';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import formatPrice from '@/utils/currency/formatPrice.';
import getUserMainImage from '@/utils/files/getUserMainImage';
import getFullServiceName from '@/services/toString/getFullServiceName';

export default function BookingConfirmationScreen() {
  const dispatch = useAppDispatch();
  const {setCarSelectedByMakeAndModel} = useContext(CarContext);
  const languageCode = useAppSelector(state => state.language.languageCode);

  const workshop = useAppSelector(state => state.booking.workshop);
  const services = useServiceChoosenByCustomer();
  const time = useAppSelector(state => state.booking.time);
  const pinCode = useAppSelector(state => state.booking.pinCode)

  const price = useMemo(() => {
    return (
      workshop?.currency! +
      formatPrice(workshop?.servicePrice ?? 0, workshop?.discount ?? 0)
    );
  }, []);

  const onConfirmToHome = () => {
    dispatch(reset());
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel(undefined);
    }
  };

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaViewLayout styles={[styles.container]}>
        <>
          <View className="flex-1 justify-center items-center mx-2.5">
            <CheckIcon height={60} width={60} />
            <Text allowFontScaling={false} className="font-bold text-2xl mt-3">
              {t('bookings.confirmed')}!
            </Text>
            <Text
              allowFontScaling={false}
              className="text-tic text-base text-center"
            >
              {t('bookingConfirmation.awaitingWorkshopConfirmation')}
            </Text>
            <View className="flex flex-col items-center justify-center mt-4 mb-6">
              <Text allowFontScaling={false} className="text-sm text-tic">
                PIN prenotazione: {pinCode}
              </Text>
              <Text allowFontScaling={false} className="text-sm text-tic">
                {formatCurrentDate(languageCode)}
              </Text>
            </View>
            <BookingCard
              type={t('bookingConfirmation.statusPending')}
              workshopName={workshop?.workshopName || 'Nome non disponibile'}
              workshopAddress={workshop?.address || 'Indirizzo non disponibile'}
              workshopImageUrl={
                workshop?.images.length
                  ? getUserMainImage(workshop.images)?.url
                  : undefined
              }
              serviceName={getFullServiceName(services)}
              time={time}
              price={price}
            />
          </View>
          <TicDriveButton
            replace={true}
            toTop={true}
            text={t('common.home')}
            routeName="userTabs"
            routeParams={{animation: 'fade'}}
            stateRouteName="Home"
            onClick={onConfirmToHome}
          />
        </>
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
