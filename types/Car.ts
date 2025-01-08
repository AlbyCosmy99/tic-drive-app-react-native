export const fuels = [
  'Petrol',
  'Diesel',
  'Electric',
  'Hybrid',
  'Plug-in Hybrid',
  'Compressed Natural Gas',
  'Liquefied Petroleum Gas',
  'Hydrogen',
  'Biofuel',
] as const;

export type FuelType = (typeof fuels)[number];

interface Car {
  id: number;
  name: string;
  year: number;
  plateNumber: string;
  carMakeId: number;
  model: string;
  engineDisplacement?: string;
  fuel: FuelType;
  mileage: number;
}

export default Car;
