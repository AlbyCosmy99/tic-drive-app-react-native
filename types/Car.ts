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
export type transmissionType = 'manual' | 'automatic';
interface Car {
  id: number;
  make: string;
  name: string;
  year?: number;
  plateNumber: string;
  model: string;
  engineDisplacement?: string;
  fuel: FuelType;
  mileage?: number;
  vin?: string;
  powerCV?: number;
  transmission: transmissionType;
}

export default Car;
