import Car from '@/types/Car';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import CarDetailsLayout from '@/app/layouts/vehicles/CarDetailsLayout';
import {useTranslation} from 'react-i18next';

interface CarConfirmationDetailsProps {
  carSelected: Car;
  setConfirmation: (confirm: boolean) => void;
}

const CarConfirmationDetails: React.FC<CarConfirmationDetailsProps> = ({
  carSelected,
  setConfirmation,
}) => {
  useEffect(() => {
    console.log(carSelected);
  });

  const {t} = useTranslation();
  

  return (
    <CarDetailsLayout carSelected={carSelected}>
      <Pressable
        onPress={() => {
          setConfirmation(false);
        }}
      >
        <Text className="text-base font-medium mt-2 text-orange-500">
          {t('change')}
        </Text>
      </Pressable>
    </CarDetailsLayout>
  );
};

export default CarConfirmationDetails;
