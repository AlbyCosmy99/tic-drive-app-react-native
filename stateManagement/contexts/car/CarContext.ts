import Car from '@/types/Car';
import {createContext} from 'react';

interface CarContextType {
    carSelectedByMakeAndModel: Car | undefined;
    setCarSelectedByMakeAndModel?: (carSelectedByMakeAndModel: Car) => void;
    carSelectedByPlate: Car | undefined;
    setCarSelectedByPlate?: (carSelectedByPlate: Car) => void;
}

const defaultContextValue: CarContextType = {
    carSelectedByMakeAndModel: undefined,
    setCarSelectedByMakeAndModel: () => {},
    carSelectedByPlate: undefined,
    setCarSelectedByPlate: () => {}
};

const CarContext = createContext<CarContextType>(defaultContextValue);

export default CarContext;
