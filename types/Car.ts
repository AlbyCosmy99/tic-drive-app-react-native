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
  carMakeId: number;
  make: string;
  name: string;
  year: number | null;
  plateNumber: string;
  model: string;
  engineDisplacement?: string;
  fuel: FuelType;
  mileage: number;
}

export default Car;
