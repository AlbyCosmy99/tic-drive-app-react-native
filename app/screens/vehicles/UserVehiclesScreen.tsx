import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import IconTextPair from '@/components/ui/IconTextPair';
import {Text, View} from 'react-native';
import AddIcon from '@/components/svgs/Add';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Car from '@/types/Car';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import {useEffect, useState} from 'react';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';
import {ScrollView} from 'react-native-gesture-handler';
import CarDetailsCard from '@/components/ui/cards/cars/CarDetailsCard';
import useOnRegisterVehicle from '@/hooks/cars/useOnRegisterVehicle';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import { useTranslation } from 'react-i18next';

const UserVehiclesScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigation = useTicDriveNavigation();
  const {getCustomerCars, loadingCustomerCars} = useCustomerCars();
  const onRegisterVehicle = useOnRegisterVehicle();
  const { t } = useTranslation();

  useEffect(() => {
    const getCars = async () => {
      const customerCars = await getCustomerCars();
      setCars(customerCars ?? []);
    };

    getCars();
  }, []);

  const handleOnMiniCarCardPress = (car: Car) => {
    navigationPush(navigation, 'UserVehicleDetailsScreen', {car});
  };

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      <View className="mx-2.5 flex-1">
        <View className="mx-2.5">
          <Text className="font-medium text-2xl mb-2">{t('vehicles.myVehicles')}</Text>
          <CrossPlatformButtonLayout
            containerTailwindCss="flex-row justify-between items-center"
            onPress={onRegisterVehicle}
          >
            <IconTextPair
              text={t('vehicles.registerVehicle')}
              icon={<AddIcon />}
              textTailwindCss="text-drive font-bold text-base"
              containerTailwindCss="gap-1"
            />
          </CrossPlatformButtonLayout>
          <HorizontalLine />
        </View>

        {loadingCustomerCars ? (
          <TicDriveSpinner />
        ) : (
          <>
            {cars.length === 0 && (
              <View>
                <Text className="text-center text-base text-gray-500 mt-6">
                {t('vehicles.noVehiclesMessage')}{' '}
                  <CrossPlatformButtonLayout onPress={onRegisterVehicle}>
                    <Text className="text-drive font-semibold">
                    {t('vehicles.registerVehicle')} 
                    </Text>
                  </CrossPlatformButtonLayout>{' '}
                  {t('vehicles.addFirstCar')}
                </Text>
              </View>
            )}

            {cars.length === 1 && <CarDetailsCard car={cars[0]} />}

            {cars.length > 1 && (
              <ScrollView className="mt-2">
                {cars.map(car => (
                  <CrossPlatformButtonLayout
                    key={car.id}
                    onPress={() => handleOnMiniCarCardPress(car)}
                  >
                    <CarDetailsMiniCard
                      make={car.make}
                      model={car.model}
                      year={car.year ?? undefined}
                      fuel={car.fuel}
                      CV={car.powerCV}
                      plateNumber={car.plateNumber}
                    />
                  </CrossPlatformButtonLayout>
                ))}
              </ScrollView>
            )}
          </>
        )}
      </View>
    </SafeAreaViewLayout>
  );
};

export default UserVehiclesScreen;
