import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import IconTextPair from '@/components/ui/IconTextPair';
import {ActivityIndicator, Text, View} from 'react-native';
import AddIcon from '@/assets/svg/add.svg';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Car from '@/types/Car';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import {useEffect, useState} from 'react';
import {Colors} from '@/constants/Colors';
import CarDetailsMiniCard from '@/components/ui/cards/cars/CarDetailsMiniCard';
import {ScrollView} from 'react-native-gesture-handler';
import CarDetailsCard from '@/components/ui/cards/cars/CarDetailsCard';
import useOnRegisterVehicle from '@/hooks/cars/useOnRegisterVehicle';
import {useIsFocused} from '@react-navigation/native';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';

const UserVehiclesScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigation = useTicDriveNavigation();
  const {getCustomerCars, loadingCustomerCars} = useCustomerCars();
  const onRegisterVehicle = useOnRegisterVehicle();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCars = async () => {
      const customerCars = await getCustomerCars();
      setCars(customerCars ?? []);
    };

    if (isFocused) {
      getCars();
    }
  }, [isFocused]);

  const handleOnMiniCarCardPress = (car: Car) => {
    navigationPush(navigation, 'UserVehicleDetailsScreen', {car});
  };

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      <View className="mx-2.5 flex-1">
        <View className="mx-2.5">
          <Text className="font-medium text-2xl mb-2">My Vehicles</Text>
          <CrossPlatformButtonLayout
            containerTailwindCss="flex-row justify-between items-center"
            onPress={onRegisterVehicle}
          >
            <IconTextPair
              text="Register vehicle"
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
                  You haven't registered any vehicles yet. Tap on{' '}
                  <CrossPlatformButtonLayout onPress={onRegisterVehicle}>
                    <Text className="text-drive font-semibold">
                      "Register vehicle"
                    </Text>
                  </CrossPlatformButtonLayout>{' '}
                  to add your first car and get started!
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
