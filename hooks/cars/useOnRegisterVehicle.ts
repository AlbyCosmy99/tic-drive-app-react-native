import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '../navigation/useTicDriveNavigation';
import Car from '@/types/Car';

const useOnRegisterVehicle = () => {
  const navigation = useTicDriveNavigation();

  const onRegisterVehicle = (carSelected?: Car) => {
    navigationPush(navigation, 'RegisterVehicleScreen', {
      carSelected,
      goToVehicles: true,
    });
  };

  return onRegisterVehicle;
};

export default useOnRegisterVehicle;
