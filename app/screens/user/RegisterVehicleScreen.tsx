import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SegmentedControl from '@/components/SegmentedControl';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext, useEffect, useMemo, useState} from 'react';
import options, {
  CarRegistrationOptions,
} from '../../../constants/VehicleRegistrationOptions';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import defaultCar from '@/constants/defaultRegistrationCar';
import cars from '@/constants/temp/Cars';
import SegmentedControlSelection from '@/types/SegmentedControlSelection';
import Car from '@/types/Car';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import getCarModelsByCarMakeId from '@/services/http/requests/cars/getCarModelsByCarMakeId';
import CarDetailsByMakeAndModel from '@/components/cars/registration/CarDetailsByMakeAndModel';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import BoldTitle1 from '@/components/ui/text/BoldTitle1';
import useCarsMakes from '@/hooks/api/cars/useCarsMakes';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {setAreServicesOn} from '@/stateManagement/redux/slices/servicesSlice';
import axios from 'axios';
import isPlateNumber from '@/utils/car/isPlateNumber';

function RegisterVehicleScreen() {
  const [segmentedControlSelection, setSegmentedControlSelection] =
    useState<SegmentedControlSelection | null>(options[0]);
  const [carSelectedByMakeAndModel, setCarSelectedByMakeAndModel] = useState<
    Car | undefined
  >(undefined);
  const [carSelectedByPlate, setCarSelectedByPlate] = useState<Car | undefined>(
    undefined,
  );
  const {carNotFound, setCarNotFound} = useContext(GlobalContext);
  const [isCarSearched, setIsCarSearched] = useState(false);
  const [loadingCarModels, setLoadingCarModels] = useState(false);
  const [models, setModels] = useState<Array<Car>>([]);
  const [isPlateError, setIsPlateError] = useState(false)
  const [errorYear, setErrorYear] = useState(false)

  const [carMakeDropdownData, setCarMakeDropdownData] = useState<
    TicDriveDropdownData | undefined
  >(undefined);
  const [carModelDropdownData, setCarModelDropdownData] = useState<
    TicDriveDropdownData | undefined
  >(undefined);

  const {
    carSelectedByMakeAndModel: carSelectedByMakeAndModelCtx,
    setCarSelectedByMakeAndModel: setCarSelectedByMakeAndModelCtx,
    carSelectedByPlate: carSelectedByPlateCtx,
  } = useContext(CarContext);

  const colorScheme = useColorScheme();
  const {carsMakes: makes, loadingCarsMakes} = useCarsMakes();
  const dispatch = useAppDispatch();

  const buttonIsEnabled = useMemo(() => {
    return (
      segmentedControlSelection?.index === 0 &&
      carSelectedByMakeAndModelCtx &&
      !!carSelectedByMakeAndModelCtx.engineDisplacement &&
      !!carSelectedByMakeAndModelCtx.fuel &&
      !!carSelectedByMakeAndModelCtx.year &&
      !!carSelectedByMakeAndModelCtx.mileage &&
      !errorYear
    );
  }, [segmentedControlSelection, carSelectedByMakeAndModelCtx, errorYear]);

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'light'
        ? Colors.light.backgroundLinearGradient.end
        : Colors.dark.background,
  };

  const fetchByPlate = (plate: string) => {
    if(isPlateNumber(plate)) {
      // axios.get("https://automotive.openapi.com/IT-car/FV181EX", {
      //   headers: {
      //     "accept": "application/json",
      //     "Authorization": "Bearer 67b1f7439ad74bab6d03ae1a"
      //   }
      // })
      //   .then(response => console.log(response.data))
      //   .catch(error => {
      //     console.error('Error:', error)
      //     setIsPlateError(true)
      //   });
    } else {
      setIsPlateError(true)
    }
  }
  // {"data": {"ABS": "", "AirBag": "", "CarMake": "MAZDA", "CarModel": "CX-5 2ª serie", "Description": "MAZDA CX-5 2ª serie", "EngineSize": "2191", "FuelType": "Diesel", "Immobiliser": "", "KType": "", "LicensePlate": "FV181EX", "MakeDescription": "MAZDA", "ModelDescription": "CX-5 2ª serie", "NumberOfDoors": "", "PowerCV": 184, "PowerFiscal": 21, "PowerKW": 135, "RegistrationYear": "2019", "TimeStamp": 1739716456, "Version": "MAZDA CX-5 2.2L Skyactiv-D 184 CV aut. AWD Exceed ( 1/2019 )", "Vin": ""}, "error": null, "message": "", "success": true}

  useEffect(() => {
    if (carMakeDropdownData) {
      const getModels = async () => {
        setLoadingCarModels(true);
        const data = await getCarModelsByCarMakeId(carMakeDropdownData?.id);
        setModels(data);
        setLoadingCarModels(false);
      };
      setCarModelDropdownData(undefined);
      getModels();
    }
  }, [carMakeDropdownData]);

  useEffect(() => {
    if (carModelDropdownData) {
      const car = models.find(model => model.id === carModelDropdownData.id);
      setCarSelectedByMakeAndModel({
        ...car,
        make: carMakeDropdownData?.value,
        model: carModelDropdownData?.value,
        year: null //todo: ignorando l'year preso dal db e lo stiamo chiedendo sempre all'utente. Controllare se e' cio che desideriamo
      });
    }
  }, [carModelDropdownData]);

  useEffect(() => {
    setCarModelDropdownData(undefined);
  }, [segmentedControlSelection]);

  //to-do: update car not found
  // useEffect(() => {
  //   console.log(servicesChoosen);
  //   if (carSelected.id === 0) {
  //     setCarNotFound(true);
  //   } else {
  //     setCarNotFound(false);
  //   }
  // }, [carSelected]);

  const handleOnRightIcon = () => {
    setCarSelectedByPlate(undefined);
    setIsCarSearched(false);
    setIsPlateError(false)
  };

  useFocusEffect(() => {
    dispatch(setAreServicesOn(false));
  });

  return (
    <SafeAreaViewLayout styles={[backgroundStyle]}>
      <ToPreviousPage containerClassName="m-2 mb-7" />
      <View className="flex-1 justify-between">
        <BoldTitle1 title="Register your vehicle for service bookings" />
        <View className="m-3.5">
          <SegmentedControl
            options={options}
            segmentedControlSelection={segmentedControlSelection}
            setSegmentedControlSelection={setSegmentedControlSelection}
          />
        </View>
        <View
          style={styles.bookingDetailsContainer}
          className="flex-1 m-3.5 border-2 rounded-xl"
        >
          <View className="h-full">
            <Text className="font-semibold mx-3.5 my-3.5 mb-0 text-lg">
              {segmentedControlSelection?.name}
            </Text>
            {segmentedControlSelection?.index === 0 && (
              <ScrollView
                className="mt-6 px-4"
                automaticallyAdjustKeyboardInsets
              >
                <TicDriveDropdown
                  title="Make"
                  data={makes.map(make => ({
                    id: make.id,
                    value: make.name,
                  }))}
                  value={carMakeDropdownData}
                  setValue={setCarMakeDropdownData}
                  placeholder="Select car make"
                  searchPlaceholder="Search make"
                />
                <TicDriveDropdown
                  title="Model"
                  data={
                    models
                      ? models.map(model => ({
                          id: model.id,
                          value: model.name,
                        }))
                      : []
                  }
                  value={carModelDropdownData}
                  setValue={setCarModelDropdownData}
                  placeholder="Select car model"
                  searchPlaceholder="Search model"
                  disabled={!carMakeDropdownData || loadingCarModels}
                />
                {carSelectedByMakeAndModel && carModelDropdownData && (
                  <CarDetailsByMakeAndModel
                    key={carModelDropdownData?.id}
                    carSelected={carSelectedByMakeAndModel}
                    errorYear={errorYear}
                    setErrorYear={setErrorYear}
                  />
                )}
              </ScrollView>
            )}
            {segmentedControlSelection?.index === 1 && (
              <>
                <TicDriveInput
                  placeholder={segmentedControlSelection.placeholder ?? ''}
                  isRightIcon={true}
                  isTextUppercase={true}
                  onRightIcon={handleOnRightIcon}
                  onSubmit={value => {fetchByPlate(value)}}
                  containerStyle={{height: 85}}
                />
                {isPlateError && <Text className='font-medium text-md text-red-500 text-center'>Insert a valid plate number. Format: AA123BB</Text>}
              </>
            )}
            {carNotFound && isCarSearched && (
              <Text className="text-base mx-auto text-red-600">
                Car not found. Try again.
              </Text>
            )}
          </View>
          <ScrollView>
            {carSelectedByPlate &&
              segmentedControlSelection?.name === 'Plate' && (
                <View className="mx-3.5">
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">Model</Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.model}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">
                      Plate number
                    </Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.plateNumber}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">VIN</Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.vin}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">Liters</Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.liters}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">Energy</Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.energy}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">
                      Engine code
                    </Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.engineCode}
                    </Text>
                  </View>
                  <View
                    className="my-1 border-b"
                    style={styles.carDetailContainer}
                  >
                    <Text className="font-bold mb-0.5 text-lg">
                      Engine displacement (cc)
                    </Text>
                    <Text className="text-lg mb-1.5">
                      {carSelectedByPlate.engineDisplacement}
                    </Text>
                  </View>
                </View>
              )}
          </ScrollView>
        </View>
      </View>
      <TicDriveButton
        text="Confirm"
        routeName="CarRegistrationConfirmationScreen"
        routeParams={{carSelected: carSelectedByMakeAndModelCtx}}
        disabled={!buttonIsEnabled}
      />
    </SafeAreaViewLayout>
  );
}

const styles = StyleSheet.create({
  bookingDetailsContainer: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.extremelyLightGrey,
  },
  carDetailContainer: {
    borderBottomColor: Colors.light.extremelyLightGrey,
  },
});

export default RegisterVehicleScreen;
