import {FC, ReactNode, useState} from 'react';
import CarContext from './CarContext';
import Car from '@/types/Car';

const CarProvider: FC<{children: ReactNode}> = ({children}) => {
  const [carSelectedByMakeAndModel, setCarSelectedByMakeAndModel] = useState<
    Car | undefined
  >(undefined);
  const [carSelectedByPlate, setCarSelectedByPlate] = useState<Car | undefined>(
    undefined,
  );
  return (
    <CarContext.Provider
      value={{
        carSelectedByMakeAndModel,
        setCarSelectedByMakeAndModel,
        carSelectedByPlate,
        setCarSelectedByPlate,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
