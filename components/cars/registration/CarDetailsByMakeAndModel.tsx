import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveTextOrInput from '@/components/ui/inputs/TicDriveTextOrInput';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import Car, {fuels, FuelType} from '@/types/Car';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import React, {useContext, useEffect} from 'react';

interface CarDetailsByMakeAndModelProps {
  carSelected: Car;
  errorYear: boolean;
  setErrorYear: (errorYear: boolean) => void;
}

const CarDetailsByMakeAndModel: React.FC<CarDetailsByMakeAndModelProps> = ({
  carSelected,
  errorYear,
  setErrorYear,
}) => {
  const {carSelectedByMakeAndModel, setCarSelectedByMakeAndModel} =
    useContext(CarContext);

  const fuelOptions: TicDriveDropdownData[] = fuels.map((fuel, index) => ({
    id: index,
    value: fuel,
  }));

  useEffect(() => {
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel({
        ...carSelectedByMakeAndModel,
        ...carSelected,
      });
    }
  }, []);

  const updateCarField = (field: Partial<Car>) => {
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel({
        ...carSelectedByMakeAndModel,
        ...field,
      });
    }
  };

  const setCarYear = (year: number) => {
    updateCarField({year});
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

  const selectedFuel = fuelOptions.find(
    item => item.value === carSelectedByMakeAndModel?.fuel,
  ) || {id: -1, value: ''};

  return (
    <>
      <TicDriveTextOrInput
        title="Year"
        placeholder="Insert car year"
        value={carSelected?.year}
        setValue={setCarYear}
        keyboardType="numeric"
        isErrorMessage={errorYear}
        setIsErrorMessage={setErrorYear}
        errorMessage={`Year must be between 1886 and ${new Date().getFullYear()}`}
        onCheckError={() => {
          const year = carSelectedByMakeAndModel?.year;
          return year && (year < 1886 || year > new Date().getFullYear());
        }}
      />

      <TicDriveDropdown
        placeholder="Choose the car fuel type"
        searchPlaceholder="Search fuel type"
        title="Fuel"
        data={fuelOptions}
        value={selectedFuel}
        setValue={setCarFuelType}
      />

      <TicDriveTextOrInput
        title="Engine size"
        placeholder="Es. 2,0"
        value={carSelected?.engineDisplacement}
        setValue={setCarEngineDisplacement}
        keyboardType="numeric"
      />

      <TicDriveTextOrInput
        title="Mileage"
        placeholder="Es. 10000km"
        value={carSelected?.mileage}
        setValue={setCarMileage}
        keyboardType="numeric"
      />
    </>
  );
};

export default CarDetailsByMakeAndModel;
