import Car from '@/types/Car';

interface CarState {
  selectedCar: Car | null | undefined;
  customerCarDeleted: boolean;
}

export default CarState;
