import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import { Colors } from '@/constants/Colors';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import { useAppDispatch } from '@/stateManagement/redux/hooks';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import { setAreServicesOn } from '@/stateManagement/redux/slices/servicesSlice';
import { useTranslation } from 'react-i18next';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import { useEffect, useState } from 'react';

export default function ChooseServicesScreen() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigation = useTicDriveNavigation();

  const { getCustomerCars, loadingCustomerCars } = useCustomerCars();
  const [registeredCars, setRegisteredCars] = useState([]);

  //@ts-ignore
  const { category, buttonContainerTailwindCss, withSafeAreaView } = route?.params ?? {
    category: 'user',
    buttonContainerTailwindCss: '',
    withSafeAreaView: true,
  };

  const isUserLookingForServices = () => !(category === 'workshop');

  useFocusEffect(() => {
    dispatch(setAreServicesOn(false));
  });

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getCustomerCars();
      setRegisteredCars(cars ?? []);
    };

    fetchCars();
  }, []);

  const handleCarSelect = (car: any) => {
    navigationPush(navigation, 'WorkshopsListScreen', { car });
  };

  const handleRegisterNewCar = () => {
    navigationPush(navigation, 'RegisterVehicleScreen');
  };

  return (
    <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
      <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.end,
        ]}
        className="flex-1 absolute w-full h-full"
      />
      <SafeAreaViewLayout disabled={withSafeAreaView !== undefined && !withSafeAreaView}>
        <TicDriveNavbar />
        <View className="flex-1 justify-between mx-2.5">
          <Text className="text-2xl font-medium text-center mb-4">{t('service.chooseVehicle')}</Text>

          {/* Scrollable car list */}
          <ScrollView className="flex-1">
            {loadingCustomerCars ? (
              <TicDriveSpinner />
            ) : registeredCars.length === 0 ? (
              <Text className="text-center text-base text-gray-500">
                {t('vehicles.noVehiclesMessage')}
              </Text>
            ) : (
              registeredCars.map((car) => (
                <CrossPlatformButtonLayout key={car.id} onPress={() => handleCarSelect(car)}>
                  <CarDetailsMiniCard
                    make={car.make}
                    model={car.model}
                    year={car.year}
                    fuel={car.fuel}
                    CV={car.powerCV}
                    plateNumber={car.plateNumber}
                  />
                </CrossPlatformButtonLayout>
              ))
            )}

            <Text className="text-center text-gray-600 text-base mt-6 mb-2">
              {t('vehicles.orRegisterNewCar')}
               </Text>

            <View className={`mb-6 ${buttonContainerTailwindCss}`}>
             <TicDriveButton
              text={t('vehicles.registerVehicle')}
             routeName="RegisterVehicleScreen"
              routeParams={{}}
              disabled={false}
             />
            </View>
          </ScrollView>
        </View>
      </SafeAreaViewLayout>
    </View>
  );
}
