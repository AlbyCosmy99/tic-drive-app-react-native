import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import IconTextPair from '@/components/ui/IconTextPair';
import {Text, View} from 'react-native';
import AddIcon from '@/assets/svg/add.svg';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Car from '@/types/Car';
import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';

const UserVehiclesScreen = () => {
  const navigation = useTicDriveNavigation();

  const cars: Car[] = [
    {
      id: 1,
      make: 'Toyota',
      name: 'Corolla',
      year: 2020,
      plateNumber: 'AB123CD',
      model: 'Corolla',
      engineDisplacement: '1.8L',
      fuel: 'Hybrid',
      mileage: 45000,
      vin: 'JTDBR32E620123456',
      transmission: 'manual',
      powerCV: 122,
    },
    // {
    //   id: 2,
    //   make: 'Tesla',
    //   name: 'Model 3',
    //   year: 2022,
    //   plateNumber: 'EV456XY',
    //   model: 'Sedan',
    //   fuel: 'Electric',
    //   mileage: 15000,
    //   vin: '5YJ3E1EA7JF123456',
    //   powerCV: 283,
    // },
    // {
    //   id: 3,
    //   make: 'Volkswagen',
    //   name: 'Golf',
    //   year: 2018,
    //   plateNumber: 'VW789GH',
    //   model: 'Hatchback',
    //   engineDisplacement: '2.0L',
    //   fuel: 'Diesel',
    //   mileage: 87000,
    //   vin: 'WVWZZZ1KZAW123456',
    //   powerCV: 150,
    // },
  ];

  const onRegisterVehicle = (carSelected?: Car) => {
    navigationPush(navigation, 'RegisterVehicleScreen', {
      carSelected,
      goToVehicles: true,
    });
  };

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      <View className="mx-2.5">
        <View className="mx-2.5">
          <Text className="font-medium text-2xl mb-2">My Vehicles</Text>
          <CrossPlatformButtonLayout
            removeAllStyles
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
        {cars.length === 0 && (
          <View>
            <Text className="text-center text-base text-gray-500 mt-6">
              You haven't registered any vehicles yet. Tap on{' '}
              <Text className="text-drive font-semibold">
                "Register vehicle"
              </Text>{' '}
              to add your first car and get started!
            </Text>
          </View>
        )}
        {cars.length === 1 && (
          <View>
            <CarDetailsLayout carSelected={cars[0]}>
              <View className="flex-row">
                <CrossPlatformButtonLayout
                  removeAllStyles
                  onPress={() => onRegisterVehicle(cars[0])}
                  styleContainer={{marginRight: 24}}
                >
                  <Text className="text-base font-medium mt-2 text-drive">
                    Change
                  </Text>
                </CrossPlatformButtonLayout>
                <CrossPlatformButtonLayout
                  removeAllStyles
                  onPress={() => console.log('a')}
                >
                  <Text className="text-base font-medium mt-2 text-tic">
                    Delete
                  </Text>
                </CrossPlatformButtonLayout>
              </View>
            </CarDetailsLayout>
          </View>
        )}
        {cars.length > 1 && (
          <View>
            <Text>more cars</Text>
          </View>
        )}
      </View>
    </SafeAreaViewLayout>
  );
};

export default UserVehiclesScreen;
