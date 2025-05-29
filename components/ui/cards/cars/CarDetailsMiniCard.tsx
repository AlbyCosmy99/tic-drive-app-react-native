import {Text, View} from 'react-native';
import NissanLogo from '@/assets/svg/carLogos/nissan.svg';
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
    <View
      className="bg-white rounded-2xl shadow-md flex-row justify-between items-center mx-2.5 my-3 px-6 py-2"
      style={{
        elevation: 4,
        shadowColor: '#000', // iOS
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      }}
    >
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
