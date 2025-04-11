import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CarDetailsCard from '@/components/ui/cards/cars/CarDetailsCard';
import Car from '@/types/Car';
import {useRoute} from '@react-navigation/native';

const UserVehicleDetailsScreen = () => {
  const route = useRoute();
  const {car} = route.params as {car: Car};
  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar />
      <CarDetailsCard car={car} />
    </SafeAreaViewLayout>
  );
};

export default UserVehicleDetailsScreen;
