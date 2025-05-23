import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveTextOrInput from '@/components/ui/inputs/TicDriveTextOrInput';
import getCarModelVersionsByModelId from '@/services/http/requests/cars/getCarModelVersionsByModelId';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import Car, {fuels, FuelType, transmissionType} from '@/types/Car';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import {useTranslation} from 'react-i18next';

interface CarDetailsByMakeAndModelProps {
  carSelected: Car;
  errorYear: boolean;
  setErrorYear: (errorYear: boolean) => void;
  modelId: number | undefined;
}

const CarDetailsByMakeAndModel: React.FC<CarDetailsByMakeAndModelProps> = ({
  carSelected,
  errorYear,
  setErrorYear,
  modelId,
}) => {
  const {carSelectedByMakeAndModel, setCarSelectedByMakeAndModel} =
    useContext(CarContext);

  const [yearOptions, setYearOptions] = useState<TicDriveDropdownData[]>([]);
  const [plateError, setPlateError] = useState(false);

  const {t} = useTranslation();

  const fuelOptions: TicDriveDropdownData[] = fuels.map((fuel, index) => ({
    id: index,
    value: fuel,
  }));

  const transmissionsOptions: TicDriveDropdownData[] = [
    {id: 1, value: 'manual'},
    {id: 2, value: 'automatic'},
  ];

  const plateRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;

  // Only update context on mount (or when carSelected.model changes)
  useEffect(() => {
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel(prev => ({
        ...prev,
        ...carSelected,
      }));
    }
  }, [carSelected.model]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await getCarModelVersionsByModelId(modelId ?? 0);
        if (response) {
          setYearOptions(
            response.map(data => ({id: data.id, value: data.year.toString()})),
          );
        }
      } catch (err) {
        console.error('Error fetching model versions:', err);
      }
    };

    if (modelId) {
      fetchYears();
    }
  }, [modelId]);

  const updateCarField = (field: Partial<Car>) => {
    setCarSelectedByMakeAndModel?.({
      ...carSelectedByMakeAndModel,
      ...field,
    });
  };

  const setCarYear = (year: TicDriveDropdownData) => {
    updateCarField({year: parseInt(year.value)});
    setErrorYear(false);
  };

  const setCarEngineDisplacement = (engineDisplacement: string) =>
    updateCarField({engineDisplacement});

  const setCarFuelType = (fuel: TicDriveDropdownData) =>
    updateCarField({fuel: fuel.value as FuelType});

  const setSelectedTransmission = (transmission: TicDriveDropdownData) =>
    updateCarField({transmission: transmission.value as transmissionType});

  const setCarMileage = (mileage: number) => updateCarField({mileage});

  const setPlateNumber = (plate: string) => {
    const formattedPlate = plate.toUpperCase();
    updateCarField({plateNumber: formattedPlate});
    setPlateError(!plateRegex.test(formattedPlate)); // true if invalid
  };

  const selectedFuel =
    fuelOptions.find(
      item => item.value === carSelectedByMakeAndModel?.fuel,
    ) || {id: -1, value: ''};

  const selectedTransmission =
    transmissionsOptions.find(
      item => item.value === carSelectedByMakeAndModel?.transmission,
    ) || {id: -1, value: ''};

  const selectedYear =
    yearOptions.find(
      item => item.value === carSelectedByMakeAndModel?.year?.toString(),
    ) || {id: -1, value: ''};

  return (
    <>
      <TicDriveDropdown
        placeholder={t('vehicles.choose_car_year')}
        searchPlaceholder={t('vehicles.search_car_year')}
        title={t('vehicles.choose_car_year')}
        data={yearOptions}
        value={selectedYear}
        setValue={setCarYear}
      />
      <TicDriveDropdown
        placeholder={t('vehicles.search_fuel_type')}
        searchPlaceholder={t('vehicles.search_fuel_type')}
        title={t('vehicles.fuel')}
        data={fuelOptions}
        value={selectedFuel}
        setValue={setCarFuelType}
      />
      <TicDriveDropdown
        placeholder={t('vehicles.search_transmission')}
        searchPlaceholder={t('vehicles.search_transmission')}
        title={t('vehicles.transmission')}
        data={transmissionsOptions}
        value={selectedTransmission}
        setValue={setSelectedTransmission}
      />
      <TicDriveTextOrInput
        title={t('vehicles.engine_size')}
        placeholder="Es. 2,0"
        value={carSelected?.engineDisplacement}
        setValue={setCarEngineDisplacement}
        keyboardType="numeric"
      />
      <TicDriveTextOrInput
        title={t('vehicles.mileage')}
        placeholder="Es. 10000km"
        value={carSelected?.mileage}
        setValue={setCarMileage}
        keyboardType="numeric"
      />
      <TicDriveTextOrInput
        title={t('vehicles.plate')}
        placeholder={t('vehicles.plate_placeholder')}
        value={carSelected?.plateNumber?.toUpperCase()}
        setValue={setPlateNumber}
      />
      {plateError && (
        <Text style={{color: 'red', marginTop: 4}}>
          {t('vehicles.plate_format_error') ||
            'Formato targa non valido. Es. AB123CD'}
        </Text>
      )}
    </>
  );
};

export default CarDetailsByMakeAndModel;
