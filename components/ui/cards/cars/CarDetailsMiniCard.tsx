import {Text, View} from 'react-native';
import NissanLogo from '@/assets/svg/carLogos/nissan.svg';
import {FuelType} from '@/types/Car';

interface CarDetailsMiniCardProps {
  make: string;
  model: string;
  year?: number;
  fuel: FuelType;
  CV?: number;
}

const CarDetailsMiniCard: React.FC<CarDetailsMiniCardProps> = ({
  make,
  model,
  year,
  fuel,
  CV,
}) => {
  return (
    <View className="mx-2.5 my-4 px-6 py-2 bg-white rounded-2xl shadow-md flex-row justify-between items-center">
      <View>
        <Text className="text-sm font-medium">
          {make} {model}
        </Text>
        <Text className="text-sm font-medium">{year && year}</Text>
        <Text className="text-sm font-medium">{fuel}</Text>
        <Text className="text-sm font-medium">{CV && `${CV} CV`}</Text>
      </View>
      <NissanLogo />
    </View>
  );
};

export default CarDetailsMiniCard;
