export type FuelType =
  | "Petrol"
  | "Diesel"
  | "Electric"
  | "Hybrid"
  | "Plug-in Hybrid"
  | "Compressed Natural Gas"
  | "Liquefied Petroleum Gas"
  | "Hydrogen"
  | "Biofuel";

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
