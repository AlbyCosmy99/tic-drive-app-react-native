import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';
import Car from '@/types/Car';
import {Text, View} from 'react-native';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import TicDriveModal from '@/components/ui/modals/TicDriveModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import {useState} from 'react';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {setCustomerCarDeleted} from '@/stateManagement/redux/slices/carsSlice';
import {useTranslation} from 'react-i18next';

interface CarDetailsCardProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({car}) => {
  const {deleteCustomerCar, loadingCustomerCars} = useCustomerCars();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();

  const handleDelete = async () => {
    await deleteCustomerCar(car.id);
    dispatch(setCustomerCarDeleted(true));
    setShowModal(false);
  };

  if (loadingCustomerCars) return <TicDriveSpinner />;

  return (
    <CarDetailsLayout carSelected={car}>
      <View className="flex-row mt-2">
        <CrossPlatformButtonLayout
          onPress={() => console.log('change')}
          styleContainer={{marginRight: 18}}
        >
          <Text
            className="text-base font-medium text-drive"
            allowFontScaling={false}
          >
            Change
          </Text>
        </CrossPlatformButtonLayout>

        <CrossPlatformButtonLayout onPress={() => setShowModal(true)}>
          <Text
            className="text-base font-medium text-tic"
            allowFontScaling={false}
          >
            Delete
          </Text>
        </CrossPlatformButtonLayout>
      </View>

      <TicDriveModal
        title={t('vehicles.deleteVehicle')}
        content={t('vehicles.deleteConfirmation')}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText={t('vehicles.confirmDelete')}
        cancelText={t('common.cancel')}
        confirmButtonStyle={{backgroundColor: '#E53935'}}
      />
    </CarDetailsLayout>
  );
};

export default CarDetailsCard;
