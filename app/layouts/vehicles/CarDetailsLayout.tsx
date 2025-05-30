import {ActivityIndicator, View} from 'react-native';
import Car from '@/types/Car';
import RegistrationCarDetailCard from '@/components/ui/cards/cars/RegistrationCarDetailCard';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {Colors} from '@/constants/Colors';
import {useTranslation} from 'react-i18next';

interface CarDetailsGeneralProps {
  carSelected: Car;
  children: React.ReactNode;
}

const CarDetailsLayout: React.FC<CarDetailsGeneralProps> = ({
  carSelected,
  children,
}) => {
  const {t} = useTranslation();

  if (!carSelected) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    );
  }

  return (
    <View className="mx-3 p-4 border-2 border-grey-light rounded-xl">
      <View className="mb-2 space-y-1">
        <RegistrationCarDetailCard
          title={t('vehicles.make')}
          value={carSelected.make || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.model')}
          value={carSelected.model || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.plate')}
          value={carSelected.plateNumber?.toUpperCase() || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.year')}
          value={carSelected.year?.toString() || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.engine_size')}
          value={carSelected.engineDisplacement?.toString() || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.fuel')}
          value={carSelected.fuel || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.mileage')}
          value={carSelected.mileage?.toString() || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.name')}
          value={carSelected.name || '-'}
        />
        <RegistrationCarDetailCard
          title={t('vehicles.cv')}
          value={carSelected.powerCV?.toString() || '-'}
        />
      </View>
      <HorizontalLine />
      {children}
    </View>
  );
};

export default CarDetailsLayout;
