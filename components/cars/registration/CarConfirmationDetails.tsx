import RegistrationCarDetailCard from '@/components/ui/cards/cars/RegistrationCarDetailCard';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Car from '@/types/Car';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';

interface CarConfirmationDetailsProps {
  carSelected: Car;
  setCarSelected: (car: Car | undefined) => void;
  setConfirmation: (confirm: boolean) => void;
}

const CarConfirmationDetails: React.FC<CarConfirmationDetailsProps> = ({
  carSelected,
  setCarSelected,
  setConfirmation,
}) => {
  return (
    <View className="mx-3 p-4 border-2 border-grey-light rounded-xl">
      <View className="mb-2">
        {carSelected?.make && (
          <RegistrationCarDetailCard title="Make" value={carSelected.make} />
        )}
        {carSelected?.model && (
          <RegistrationCarDetailCard title="Model" value={carSelected.model} />
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
            title="Mileage"
            value={carSelected.powerCV.toString()}
          />
        )}
      </View>
      <HorizontalLine />
      <Pressable
        onPress={() => {
          setConfirmation(false);
          if (setCarSelected) {
            setCarSelected(undefined);
          }
        }}
      >
        <Text className="text-base font-medium mt-2 text-orange-500">
          Change
        </Text>
      </Pressable>
    </View>
  );
};

export default CarConfirmationDetails;
