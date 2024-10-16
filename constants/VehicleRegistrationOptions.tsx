import VehicleRegistrationOption from '@/app/types/VehicleRegistrationOption';

const vehicleRegistrationOptions: VehicleRegistrationOption[] = [
  {
    index: 0,
    name: 'Licence Plate',
    placeholder: 'E.g. AA123BB',
    inputLabel: 'Plate number',
    keyString: 'plateNumber',
  },
  {
    index: 1,
    name: 'Model',
    placeholder: 'E.g. FIAT PANDA 1.2',
    inputLabel: 'Model',
    keyString: 'model',
  },
  {
    index: 2,
    name: 'VIN',
    placeholder: 'E.g. 1HGCM82633A123456',
    inputLabel: 'VIN',
    keyString: 'vin',
  },
];

export type CarRegistrationOptions = 'vin' | 'plateNumber' | 'model';

export default vehicleRegistrationOptions;
