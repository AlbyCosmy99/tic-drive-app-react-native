import VehicleRegistrationOption from '@/app/types/VehicleRegistrationOption';

const vehicleRegistrationOptions: VehicleRegistrationOption[] = [
  {
    index: 0,
    name: 'Plate',
    placeholder: 'E.g. AA123BB',
    inputLabel: 'Plate',
    keyString: 'plateNumber',
  },
  {
    index: 1,
    name: 'Make and model',
    placeholder: 'E.g. FIAT PANDA 1.2',
    inputLabel: 'Make and model',
    keyString: 'make and model',
  }
];

export type CarRegistrationOptions = 'plateNumber' | 'make and model';

export default vehicleRegistrationOptions;
