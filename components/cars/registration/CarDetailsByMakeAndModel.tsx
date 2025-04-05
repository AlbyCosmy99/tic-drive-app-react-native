import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveTextOrInput from '@/components/ui/inputs/TicDriveTextOrInput';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import Car, {fuels, FuelType, transmissionType} from '@/types/Car';
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

  const transmissionsOptions: TicDriveDropdownData[] = [
    {
      id: 1,
      value: 'manual',
    },
    {id: 2, value: 'automatic'},
  ];

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

  const setCarFuelType = (fuel: TicDriveDropdownData) => {
    updateCarField({fuel: fuel.value as FuelType});
  };

  const setSelectedTransmission = (transmission: TicDriveDropdownData) => {
    updateCarField({transmission: transmission.value as transmissionType});
  };

  const setCarMileage = (mileage: number) => {
    updateCarField({mileage});
  };

  const setPlateNumber = (plate: string) => {
    updateCarField({plateNumber: plate.toUpperCase()});
  };

  const selectedFuel = fuelOptions.find(
    item => item.value === carSelectedByMakeAndModel?.fuel,
  ) || {id: -1, value: ''};

  const selectedTransmission = transmissionsOptions.find(
    item => item.value === carSelectedByMakeAndModel?.transmission,
  ) || {id: -1, value: ''};

  return (
    <>
      <TicDriveDropdown
        placeholder="Choose the car fuel type"
        searchPlaceholder="Search fuel type"
        title="Fuel"
        data={fuelOptions}
        value={selectedFuel}
        setValue={setCarFuelType}
      />
      <TicDriveDropdown
        placeholder="Choose the car fuel transmission"
        searchPlaceholder="Search fuel transmission"
        title="Transmission"
        data={transmissionsOptions}
        value={selectedTransmission}
        setValue={setSelectedTransmission}
      />
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
      <TicDriveTextOrInput
        title="Plate"
        placeholder="Es. AB123CD"
        value={carSelected?.plateNumber?.toUpperCase()}
        setValue={setPlateNumber}
      />
    </>
  );
};

export default CarDetailsByMakeAndModel;
