import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveTextOrInput from '@/components/ui/inputs/TicDriveTextOrInput';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import Car, {fuels, FuelType} from '@/types/Car';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import React, {useContext, useEffect} from 'react';

interface CarDetailsByMakeAndModelProps {
  carSelected: Car;
}

const CarDetailsByMakeAndModel: React.FC<CarDetailsByMakeAndModelProps> = ({
  carSelected,
}) => {
  const {carSelectedByMakeAndModel, setCarSelectedByMakeAndModel} =
    useContext(CarContext);

  useEffect(() => {
    if (setCarSelectedByMakeAndModel) {
      console.log(carSelectedByMakeAndModel);
      setCarSelectedByMakeAndModel({
        ...carSelectedByMakeAndModel,
        ...carSelected,
      });
    }
  }, []);

  useEffect(() => {
    if (carSelectedByMakeAndModel?.fuel && setCarSelectedByMakeAndModel) {
      const {fuel, ...carWithoutFuel} = carSelectedByMakeAndModel;
      setCarSelectedByMakeAndModel(carWithoutFuel as Car);
    }
  }, [carSelected]);

  const updateCarField = (field: Partial<Car>) => {
    if (setCarSelectedByMakeAndModel) {
      //@ts-ignore
      setCarSelectedByMakeAndModel({
        ...carSelectedByMakeAndModel,
        ...field,
      });
    }
  };

  const setCarYear = (year: number) => {
    if (year >= 1886 && year <= new Date().getFullYear()) {
      updateCarField({year});
    } else {
      console.error('Invalid year');
    }
  };

  const setCarEngineDisplacement = (engineDisplacement: string) => {
    updateCarField({engineDisplacement});
  };

  const setCarPlateNumber = (plateNumber: string) => {
    updateCarField({plateNumber});
  };

  const setCarFuelType = (fuel: TicDriveDropdownData) => {
    updateCarField({fuel: fuel.value as FuelType});
  };

  const setCarMileage = (mileage: number) => {
    updateCarField({mileage});
  };

  return (
    <>
      <TicDriveTextOrInput
        title="Year"
        placeholder="Insert car year"
        value={carSelected?.year}
        setValue={setCarYear}
      />
      <TicDriveDropdown
        placeholder="Choose the car fuel type"
        searchPlaceholder="Search fuel type"
        title="Fuel"
        data={fuels.map((fuel, index) => ({id: index, value: fuel}))}
        value={{id: -1, value: carSelectedByMakeAndModel?.fuel!}}
        setValue={setCarFuelType}
      />
      <TicDriveTextOrInput
        title="Plate number"
        placeholder="Insert plate"
        value={carSelected?.plateNumber}
        setValue={setCarPlateNumber}
      />
      <TicDriveTextOrInput
        title="Engine displacement"
        placeholder="Insert displacement"
        value={carSelected?.engineDisplacement}
        setValue={setCarEngineDisplacement}
      />
      <TicDriveTextOrInput
        title="Mileage"
        placeholder="Insert mileage"
        value={carSelected?.mileage}
        setValue={setCarMileage}
      />
    </>
  );
};

export default CarDetailsByMakeAndModel;
