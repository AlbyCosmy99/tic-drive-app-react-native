import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import {useEffect, useState} from 'react';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import Car from '@/types/Car';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import {useTranslation} from 'react-i18next';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useOnRegisterVehicle from '@/hooks/cars/useOnRegisterVehicle';
import getBookingsAsync from '@/services/http/requests/get/bookings/getBookingsAsync';
import {Booking, Bookings} from '@/types/bookings/Bookings';
import {BookingStatus} from '@/types/bookings/BookingStatus';
import BookingCard from '@/components/ui/cards/bookings/BookingCard';

export default function UserBookings() {
  const {t} = useTranslation();
  const token = useJwtToken();
  const {getCustomerCars, loadingCustomerCars} = useCustomerCars();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Bookings>({});
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'rejected'>(
    'active',
  );
  const onRegisterVehicle = useOnRegisterVehicle();

  type TabStatus = 'active' | 'past' | 'rejected';

  const statusMap: Record<TabStatus, BookingStatus[]> = {
    active: ['Waiting', 'Accepted', 'RescheduleProposed'],
    past: ['Completed'],
    rejected: ['Rejected'],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const customerCars = await getCustomerCars();
        setCars(customerCars ?? []);

        const res = await getBookingsAsync(token ?? '');
        const bookingsArray = res.data ?? [];

        const groupedByCustomerCarId = bookingsArray.reduce(
          (acc: Bookings, booking: Booking) => {
            const carId = booking.customerCarId;
            if (!acc[carId]) acc[carId] = [];
            acc[carId].push(booking);
            return acc;
          },
          {} as Bookings,
        );

        setBookings(groupedByCustomerCarId);
      } catch (error) {
        console.error('Failed to fetch cars or bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        {token ? (
          <View className="mx-2.5 flex-1 mb-4">
            <TicDriveNavbar />
            <Text
              allowFontScaling={false}
              className="font-medium text-2xl text-center"
            >
              {t('bookings.title')}
            </Text>

            <View className="flex-row bg-gray-100 rounded-full p-1 mt-4 mx-4">
              {['active', 'past', 'rejected'].map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() =>
                    setActiveTab(tab as 'active' | 'past' | 'rejected')
                  }
                  className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? 'bg-white' : ''}`}
                >
                  <Text
                    allowFontScaling={false}
                    className="font-medium capitalize"
                  >
                    {tab === 'active'
                      ? t('bookingsTabs.active')
                      : tab === 'past'
                        ? t('bookingsTabs.past')
                        : t('bookingsTabs.rejected')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {loadingCustomerCars || loading ? (
              <TicDriveSpinner />
            ) : cars.length === 0 ? (
              <CrossPlatformButtonLayout onPress={onRegisterVehicle}>
                <Text
                  allowFontScaling={false}
                  className="text-center text-lg font-semibold mt-6 underline"
                >
                  {t('vehicles.registerVehicleForBookings')}
                </Text>
              </CrossPlatformButtonLayout>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {Object.entries(bookings).map(([carId, appointments]) => {
                  const filteredAppointments = appointments.filter(
                    appointment =>
                      statusMap[activeTab].includes(appointment.status),
                  );
                  if (filteredAppointments.length === 0) return null;
                  const firstBooking = filteredAppointments[0]; // Use first booking to show car info

                  return (
                    <View key={carId} className="mt-6">
                      <Text
                        allowFontScaling={false}
                        className="text-xl font-semibold text-center mb-2"
                      >
                        {firstBooking?.customerCarName} (
                        {firstBooking?.customerCarPlate})
                      </Text>

                      <CarDetailsMiniCard
                        make={firstBooking?.customerCarMake}
                        model={firstBooking?.customerCarModel}
                        year={firstBooking?.customerCarYear}
                        plateNumber={firstBooking?.customerCarPlate}
                        imageUrl={firstBooking?.customerCarLogoUrl}
                      />

                      {filteredAppointments.map(appointment => (
                        <View key={appointment.id} className="my-1">
                          <BookingCard
                            showDirectionsButton={false}
                            type={appointment.status}
                            workshopName={appointment.workshopName}
                            workshopAddress={appointment.workshopAddress}
                            workshopImageUrl={appointment.workshopImage.url}
                            serviceName={appointment.serviceName}
                            time={appointment.appointmentDate}
                            price={'€' + appointment.finalPrice}
                          />
                        </View>
                      ))}
                    </View>
                  );
                })}
              </ScrollView>
            )}
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
