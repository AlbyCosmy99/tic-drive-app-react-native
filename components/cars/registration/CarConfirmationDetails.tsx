import Car from '@/types/Car';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';

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
  useEffect(() => {
    console.log(carSelected);
  });

  return (
    <CarDetailsLayout carSelected={carSelected}>
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
    </CarDetailsLayout>
  );
};

export default CarConfirmationDetails;
