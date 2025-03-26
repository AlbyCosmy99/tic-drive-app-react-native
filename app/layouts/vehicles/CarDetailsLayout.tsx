import {View} from 'react-native';
import Car from '@/types/Car';
import RegistrationCarDetailCard from '@/components/ui/cards/cars/RegistrationCarDetailCard';
import HorizontalLine from '@/components/ui/HorizontalLine';

interface CarDetailsGeneralProps {
  carSelected: Car;
  children: React.ReactNode;
}

const CarDetailsLayout: React.FC<CarDetailsGeneralProps> = ({
  carSelected,
  children,
}) => {
  return (
    <View className="mx-3 p-4 border-2 border-grey-light rounded-xl mt-6">
      <View className="mb-2">
        {carSelected?.make && (
          <RegistrationCarDetailCard title="Make" value={carSelected.make} />
        )}
        {carSelected?.model && (
          <RegistrationCarDetailCard title="Model" value={carSelected.model} />
        )}
        {carSelected?.plateNumber && (
          <RegistrationCarDetailCard
            title="Plate number"
            value={carSelected.plateNumber}
          />
        )}
        {carSelected.year && (
          <RegistrationCarDetailCard
            title="Year"
            value={carSelected.year.toString()}
          />
        )}
        {carSelected.engineDisplacement && (
          <RegistrationCarDetailCard
            title="Engine displacement"
            value={carSelected.engineDisplacement!}
          />
        )}
        {carSelected.fuel && (
          <RegistrationCarDetailCard title="Fuel" value={carSelected.fuel} />
        )}
        {carSelected.mileage && (
          <RegistrationCarDetailCard
            title="Mileage"
            value={carSelected.mileage.toString()}
          />
        )}
        {carSelected.name && (
          <RegistrationCarDetailCard title="Name" value={carSelected.name} />
        )}
        {carSelected.powerCV && (
          <RegistrationCarDetailCard
            title="CV"
            value={carSelected.powerCV.toString()}
          />
        )}
      </View>
      <HorizontalLine />
      {children}
    </View>
  );
};

export default CarDetailsLayout;
