import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveTextOrInput from '@/components/ui/inputs/TicDriveTextOrInput';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import Car, {fuels, FuelType} from '@/types/Car';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';

interface CarDetailsByPlateProps {
  carSelected: Car;
  errorYear: boolean;
  setErrorYear: (errorYear: boolean) => {};
}

const CarDetailsByPlate: React.FC<CarDetailsByPlateProps> = ({
  carSelected,
  errorYear,
  setErrorYear,
}) => {
  const {carSelectedByPlate, setCarSelectedByPlate} = useContext(CarContext);

  useEffect(() => {
    if (setCarSelectedByPlate) {
      setCarSelectedByPlate({
        ...carSelectedByPlate,
        ...carSelected,
      });
    }
  }, []);

  useEffect(() => {
    if (carSelectedByPlate?.fuel && setCarSelectedByPlate) {
      const {fuel, ...carWithoutFuel} = carSelectedByPlate;
      setCarSelectedByPlate(carWithoutFuel as Car);
    }
  }, [carSelected]);

  const updateCarField = (field: Partial<Car>) => {
    if (setCarSelectedByPlate) {
      //@ts-ignore
      setCarSelectedByPlate({
        ...carSelectedByPlate,
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

  useEffect(() => {
    console.log(carSelectedByPlate);
  }, [carSelectedByPlate]);

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
          if (
            carSelectedByPlate?.year &&
            carSelectedByPlate.year > 0 &&
            !(
              carSelectedByPlate.year >= 1886 &&
              carSelectedByPlate.year <= new Date().getFullYear()
            )
          ) {
            return true;
          }
          return false;
        }}
      />
      <TicDriveDropdown
        placeholder="Choose the car fuel type"
        searchPlaceholder="Search fuel type"
        title="Fuel"
        data={fuels.map((fuel, index) => ({id: index, value: fuel}))}
        value={{id: -1, value: carSelectedByPlate?.fuel!}}
        setValue={setCarFuelType}
      />
      {/* <TicDriveTextOrInput
        title="Plate number"
        placeholder="Insert plate"
        value={carSelected?.plateNumber}
        setValue={setCarPlateNumber}
      /> */}
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
      <View className="mx-3 my-1">
        {carSelected?.name && (
          <View>
            <Text className="font-bold mb-0.5 text-lg">Name</Text>
            <Text className="text-lg mb-1.5">{carSelected?.name}</Text>
          </View>
        )}
        {carSelected?.vin && (
          <View>
            <Text className="font-bold mb-0.5 text-lg">VIN</Text>
            <Text className="text-lg mb-1.5">{carSelected?.vin}</Text>
          </View>
        )}
        {carSelected?.powerCV && (
          <View>
            <Text className="font-bold mb-0.5 text-lg">CV</Text>
            <Text className="text-lg mb-1.5">{carSelected?.powerCV}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default CarDetailsByPlate;
