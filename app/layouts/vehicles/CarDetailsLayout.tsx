import {ActivityIndicator, View} from 'react-native';
import Car from '@/types/Car';
import RegistrationCarDetailCard from '@/components/ui/cards/cars/RegistrationCarDetailCard';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {Colors} from '@/constants/Colors';

interface CarDetailsGeneralProps {
  carSelected: Car;
  children: React.ReactNode;
}

const CarDetailsLayout: React.FC<CarDetailsGeneralProps> = ({
  carSelected,
  children,
}) => {
  return carSelected ? (
    <View className="mx-3 p-4 border-2 border-grey-light rounded-xl mt-6">
      <View className="mb-2">
        <RegistrationCarDetailCard title="Make" value={carSelected?.make} />
        <RegistrationCarDetailCard title="Model" value={carSelected?.model} />
        <RegistrationCarDetailCard
          title="Plate number"
          value={carSelected.plateNumber?.toUpperCase() ?? ''}
        />
        <RegistrationCarDetailCard
          title="Year"
          value={carSelected.year?.toString() ?? ''}
        />
        <RegistrationCarDetailCard
          title="Engine displacement"
          value={carSelected.engineDisplacement!}
        />
        <RegistrationCarDetailCard title="Fuel" value={carSelected.fuel} />
        <RegistrationCarDetailCard
          title="Mileage"
          value={carSelected.mileage?.toString() ?? ''}
        />
        <RegistrationCarDetailCard title="Name" value={carSelected.name} />
        <RegistrationCarDetailCard
          title="CV"
          value={carSelected.powerCV?.toString() ?? ''}
        />
      </View>
      <HorizontalLine />
      {children}
    </View>
  ) : (
    <ActivityIndicator size="large" color={Colors.light.bookingsOptionsText} />
  );
};

export default CarDetailsLayout;
