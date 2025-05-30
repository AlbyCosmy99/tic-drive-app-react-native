import {Text, View} from 'react-native';
import NissanLogo from '@/assets/svg/carLogos/nissan.svg'; // Fallback default
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
  // Optional: dynamic logo resolution based on make
  const CarLogo = NissanLogo; // Replace with a switch or dynamic import logic

  return (
    <View
      className="bg-white rounded-2xl shadow-md flex-row justify-between items-center mx-2.5 my-3 px-6 py-2"
      style={{
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      }}
    >
      <View className="flex-1 pr-4">
        <Text className="text-sm font-medium" allowFontScaling={false}>
          {make} {model}
        </Text>
        {plateNumber && (
          <Text className="text-sm text-gray-600" allowFontScaling={false}>
            {plateNumber}
          </Text>
        )}
        {year && (
          <Text className="text-sm text-gray-600" allowFontScaling={false}>
            {year}
          </Text>
        )}
        {CV && (
          <Text className="text-sm text-gray-600" allowFontScaling={false}>
            {CV} CV • {fuel}
          </Text>
        )}
      </View>
      <View className="items-end">
        <CarLogo width={36} height={36} />
      </View>
    </View>
  );
};

export default CarDetailsMiniCard;
