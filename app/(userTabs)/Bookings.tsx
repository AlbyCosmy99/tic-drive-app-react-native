import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text} from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import NissanLogo from '@/assets/svg/carLogos/nissan.svg';
import PaymentConfirmationCard from '@/components/ui/cards/payment/PaymentConfirmationCard';
import Workshop from '@/types/workshops/Workshop';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {useEffect} from 'react';
import {setServicesChoosenByUsers} from '@/stateManagement/redux/slices/servicesSlice';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';

export default function UserBookings() {
  const token = useJwtToken();
  const dispatch = useAppDispatch();

  const sampleWorkshop: Workshop = {
    id: 1,
    name: 'Officina Meccanica Rossi',
    address: 'Via Roma 42, Milano, Italia',
    longitude: 9.19,
    latitude: 45.4642,
    profileImageUrl:
      'https://www.officinadanilo.it/wp-content/uploads/sites/133/2022/04/OfficinaDanilo_04_2022_Lavorazioni_17.jpg',
    meanStars: 4.5,
    numberOfReviews: 87,
    servicePrice: 120,
    currency: '€',
    discount: 10,
    isFavorite: true,
    isVerified: true,
  };

  useEffect(() => {
    dispatch(
      setServicesChoosenByUsers({
        id: 1,
        title: 'Oil Change',
        description: 'oil change',
        icon: 'https://img.icons8.com/dotty/80/car-service.png',
      }),
    );
  }, []);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        {token ? (
          <View className="mx-2.5">
            <Text className="font-medium text-2xl text-center">Interventi</Text>
            <View className="mt-4">
              <Text className="text-xl font-semibold text-center mb-2">
                Auto di Marian
              </Text>
              <CarDetailsMiniCard
                make="Nissan"
                model="Micra IV"
                year={2015}
                fuel="Petrol"
                CV={80}
              />
              <PaymentConfirmationCard
                showDirectionsButton={false}
                workshop={sampleWorkshop}
                timeDate={'Martedì, 24 gennaio ore 10:00'}
                type="Confirmed"
              />
            </View>
          </View>
        ) : (
          <>
            <TicDriveNavbar />
            <NotLogged />
          </>
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
