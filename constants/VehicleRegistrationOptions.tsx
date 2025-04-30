import VehicleRegistrationOption from '@/types/VehicleRegistrationOption';
import { t } from 'i18next';

const vehicleRegistrationOptions: VehicleRegistrationOption[] = [
  {
    index: 0,
    name: t('vehicles.makeAndModel'),
    placeholder: 'E.g. FIAT PANDA 1.2',
    inputLabel: t('vehicles.makeAndModel'),
    keyString: 'make and model',
  },
  {
    index: 1,
    name: 'Plate',
    placeholder: 'E.g. AA123BB',
    inputLabel: 'Plate',
    keyString: 'plateNumber',
  },
];

export type CarRegistrationOptions = 'plateNumber' | 'make and model';

export default vehicleRegistrationOptions;
