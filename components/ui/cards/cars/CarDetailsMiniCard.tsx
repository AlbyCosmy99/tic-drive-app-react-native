import {Text, View} from 'react-native';
import NissanLogo from '@/components/svgs/carLogos/Nissan';
import {FuelType} from '@/types/Car';

interface CarDetailsMiniCardProps {
  make: string;
  model: string;
  year?: number;
  fuel: FuelType;
  CV?: number;
  plateNumber?: string;
}

const CarDetailsMiniCard: React.FC<CarDetailsMiniCardProps> = ({
  make,
  model,
  year,
  fuel,
  CV,
  plateNumber,
}) => {
  return (
    <View className="mx-2.5 my-3 px-6 py-2 bg-white rounded-2xl shadow-md flex-row justify-between items-center">
      <View>
        <Text className="text-sm font-medium">
          {make} {model}
        </Text>
        {plateNumber && (
          <Text className="text-sm font-medium">{plateNumber}</Text>
        )}
        {year && <Text className="text-sm font-medium">{year}</Text>}
      </View>
      <NissanLogo />
    </View>
  );
};

export default CarDetailsMiniCard;
