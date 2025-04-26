import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import PaymentConfirmationCard from '@/components/ui/cards/payment/PaymentConfirmationCard';
import Workshop from '@/types/workshops/Workshop';
import { useAppDispatch } from '@/stateManagement/redux/hooks';
import { useEffect, useState } from 'react';
import { setServicesChoosenByUsers } from '@/stateManagement/redux/slices/servicesSlice';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';

export default function UserBookings() {
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'cancelled'>('active');

  useEffect(() => {
    dispatch(
      setServicesChoosenByUsers({
        id: 1,
        title: 'Cambio olio',
        description: 'Cambio olio',
        icon: 'https://img.icons8.com/dotty/80/car-service.png',
      }),
    );
  }, []);

  const activeAppointments: Workshop[] = [
    {
      id: 1,
      name: 'Autofficina Futura',
      address: 'Via Giulio Zanon, 8, 35133 Pontevigodarzere PD',
      longitude: 9.19,
      latitude: 45.4642,
      profileImageUrl: 'https://www.officinadanilo.it/wp-content/uploads/sites/133/2022/04/OfficinaDanilo_04_2022_Lavorazioni_17.jpg',
      meanStars: 4.5,
      numberOfReviews: 87,
      servicePrice: 157,
      currency: '€',
      discount: 0,
      isFavorite: true,
      isVerified: true,
    },
  ];

  const pastAppointments: Workshop[] = [
    {
      id: 2,
      name: 'Autofficina Vecchia',
      address: 'Via Milano, 10, 35100 Padova PD',
      longitude: 9.19,
      latitude: 45.4642,
      profileImageUrl: 'https://www.officinadanilo.it/wp-content/uploads/sites/133/2022/04/OfficinaDanilo_04_2022_Lavorazioni_17.jpg',
      meanStars: 4.0,
      numberOfReviews: 100,
      servicePrice: 120,
      currency: '€',
      discount: 0,
      isFavorite: false,
      isVerified: true,
    },
  ];

  const cancelledAppointments: Workshop[] = [
    {
      id: 3,
      name: 'Garage Annullato',
      address: 'Via Cancellata, 5, Venezia VE',
      longitude: 9.19,
      latitude: 45.4642,
      profileImageUrl: 'https://www.officinadanilo.it/wp-content/uploads/sites/133/2022/04/OfficinaDanilo_04_2022_Lavorazioni_17.jpg',
      meanStars: 3.5,
      numberOfReviews: 50,
      servicePrice: 100,
      currency: '€',
      discount: 0,
      isFavorite: false,
      isVerified: false,
    },
  ];

  const getAppointments = () => {
    if (activeTab === 'active') return activeAppointments;
    if (activeTab === 'past') return pastAppointments;
    if (activeTab === 'cancelled') return cancelledAppointments;
    return [];
  };

  const appointments = getAppointments();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        {token ? (
          <View className="mx-2.5">
            <Text className="font-medium text-2xl text-center">Interventi</Text>

            {/* Tabs */}
            <View className="flex-row bg-gray-100 rounded-full p-1 mt-4 mx-4">
              {['active', 'past', 'cancelled'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab as 'active' | 'past' | 'cancelled')}
                  className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? 'bg-white' : ''}`}
                >
                  <Text className="font-medium capitalize">
                    {tab === 'active' ? 'Attivi' : tab === 'past' ? 'Passati' : 'Cancellati'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Car Details */}
            <View className="mt-6">
              <Text className="text-xl font-semibold text-center mb-2">
                Auto di Jhonny
              </Text>
              <CarDetailsMiniCard
                make="Nissan"
                model="Micra IV"
                year={2015}
                fuel="Benzina"
                CV={80}
              />

              {/* Appointments List */}
              <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="mt-4">
                    <PaymentConfirmationCard
                      showDirectionsButton={false}
                      showReminderBell={activeTab === 'active'}
                      workshop={item}
                      timeDate={'Martedì, 24 gennaio ore 10:00'}
                      type={
                        activeTab === 'active' ? 'Confirmed' :
                        activeTab === 'past' ? 'Completed' :
                        'Cancelled'
                      }
                    />
                  </View>
                )}
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
