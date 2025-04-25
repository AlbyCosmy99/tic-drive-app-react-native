import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';
import Car from '@/types/Car';
import { Text, View } from 'react-native';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import TicDriveModal from '@/components/ui/modals/TicDriveModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import { useState } from 'react';

interface CarDetailsCardProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({ car }) => {
  const navigation = useTicDriveNavigation();
  const { deleteCustomerCar, loadingCustomerCars } = useCustomerCars();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await deleteCustomerCar(car.id);
    setShowModal(false);
  };

  if (loadingCustomerCars) {
    return <TicDriveSpinner />;
  }

  return (
    <CarDetailsLayout carSelected={car}>
      <View className="flex-row">
        <CrossPlatformButtonLayout
          removeAllStyles
          onPress={() => console.log('change')}
          styleContainer={{ marginRight: 24 }}
        >
          <Text className="text-base font-medium mt-2 text-drive">Change</Text>
        </CrossPlatformButtonLayout>

        <CrossPlatformButtonLayout
          removeAllStyles
          onPress={() => setShowModal(true)}
        >
          <Text className="text-base font-medium mt-2 text-tic">Delete</Text>
        </CrossPlatformButtonLayout>
      </View>

      <TicDriveModal
        title="Delete Vehicle"
        content="Are you sure you want to delete this vehicle?"
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        confirmButtonStyle={{ backgroundColor: '#E53935' }}
      />
    </CarDetailsLayout>
  );
};

export default CarDetailsCard;
