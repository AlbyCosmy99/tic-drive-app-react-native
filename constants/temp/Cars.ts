export interface Car {
  id: number;
  liters: number;
  energy: string;
  engineCode: string;
  enginePower: number;
  engineDisplacement: number;
  vin: string; //VehicleRegistrationOptions keyString for vin
  plateNumber: string; //VehicleRegistrationOptions keyString for plate number
  model: string; //VehicleRegistrationOptions keyString for model
}

const cars: Car[] = [
  {
    id: 1,
    liters: 2.0,
    energy: 'Gasoline',
    engineCode: 'ABC123',
    enginePower: 150,
    engineDisplacement: 2000,
    vin: '1HGCM82633A123456',
    plateNumber: 'AA123BB',
    model: 'Fiat Panda 1.2',
  },
  {
    id: 2,
    liters: 3.5,
    energy: 'Diesel',
    engineCode: 'DEF456',
    enginePower: 220,
    engineDisplacement: 3500,
    vin: '2T1BR32E04C123457',
    plateNumber: 'BB456CC',
    model: 'BMW X5 3.5d',
  },
  {
    id: 3,
    liters: 1.8,
    energy: 'Hybrid',
    engineCode: 'GHI789',
    enginePower: 130,
    engineDisplacement: 1800,
    vin: '3FAFP11312R123458',
    plateNumber: 'CC789DD',
    model: 'Toyota Prius 1.8 Hybrid',
  },
  {
    id: 4,
    liters: 2.2,
    energy: 'Gasoline',
    engineCode: 'JKL012',
    enginePower: 160,
    engineDisplacement: 2200,
    vin: '5FNYF4H96DB123459',
    plateNumber: 'DD012EE',
    model: 'Honda Civic 2.2',
  },
  {
    id: 5,
    liters: 4.0,
    energy: 'Diesel',
    engineCode: 'MNO345',
    enginePower: 300,
    engineDisplacement: 4000,
    vin: '1C4RJFAG5FC123450',
    plateNumber: 'EE345FF',
    model: 'Land Rover Defender 4.0',
  },
  {
    id: 6,
    liters: 1.5,
    energy: 'Electric',
    engineCode: 'PQR678',
    enginePower: 120,
    engineDisplacement: 0,
    vin: '4T1BF1FK2FU123451',
    plateNumber: 'FF678GG',
    model: 'Tesla Model 3',
  },
  {
    id: 7,
    liters: 2.8,
    energy: 'Gasoline',
    engineCode: 'STU901',
    enginePower: 200,
    engineDisplacement: 2800,
    vin: '1N4AL3AP2DC123452',
    plateNumber: 'GG901HH',
    model: 'Mercedes-Benz C-Class 2.8',
  },
  {
    id: 8,
    liters: 3.0,
    energy: 'Diesel',
    engineCode: 'VWX234',
    enginePower: 250,
    engineDisplacement: 3000,
    vin: '2HGFG3B50AH123453',
    plateNumber: 'HH234II',
    model: 'Audi Q7 3.0 TDI',
  },
  {
    id: 9,
    liters: 1.2,
    energy: 'Hybrid',
    engineCode: 'YZA567',
    enginePower: 110,
    engineDisplacement: 1200,
    vin: '1G1ZT54875F123454',
    plateNumber: 'II567JJ',
    model: 'Fiat 500 Hybrid',
  },
  {
    id: 10,
    liters: 5.0,
    energy: 'Gasoline',
    engineCode: 'BCD890',
    enginePower: 400,
    engineDisplacement: 5000,
    vin: '3VWDX7AJ5DM123455',
    plateNumber: 'JJ890KK',
    model: 'Ford Mustang 5.0',
  },
];

export default cars;
