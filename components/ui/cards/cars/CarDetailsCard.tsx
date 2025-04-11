import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';
import Car from '@/types/Car';
import {Text, View} from 'react-native';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

interface CarDetailsCardProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({car}) => {
  const navigation = useTicDriveNavigation();

  const onRegisterVehicle = (carSelected?: Car) => {
    navigationPush(navigation, 'RegisterVehicleScreen', {
      carSelected,
      goToVehicles: true,
    });
  };
  return (
    <CarDetailsLayout carSelected={car}>
      <View className="flex-row">
        <CrossPlatformButtonLayout
          removeAllStyles
          onPress={() => onRegisterVehicle(car)}
          styleContainer={{marginRight: 24}}
        >
          <Text className="text-base font-medium mt-2 text-drive">Change</Text>
        </CrossPlatformButtonLayout>
        <CrossPlatformButtonLayout
          removeAllStyles
          onPress={() => console.log('delete')}
        >
          <Text className="text-base font-medium mt-2 text-tic">Delete</Text>
        </CrossPlatformButtonLayout>
      </View>
    </CarDetailsLayout>
  );
};

export default CarDetailsCard;
