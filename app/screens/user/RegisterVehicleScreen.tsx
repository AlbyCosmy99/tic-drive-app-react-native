import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import SegmentedControl from '@/components/SegmentedControl';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext, useEffect, useMemo, useState} from 'react';
import options from '../../../constants/VehicleRegistrationOptions';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import SegmentedControlSelection from '@/types/SegmentedControlSelection';
import Car, {FuelType} from '@/types/Car';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import getCarModelsByCarMakeId from '@/services/http/requests/cars/getCarModelsByCarMakeId';
import CarDetailsByMakeAndModel from '@/components/cars/registration/CarDetailsByMakeAndModel';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import BoldTitle1 from '@/components/ui/text/BoldTitle1';
import useCarsMakes from '@/hooks/api/cars/useCarsMakes';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {setAreServicesOn} from '@/stateManagement/redux/slices/servicesSlice';
import isPlateNumber from '@/utils/car/isPlateNumber';
import CarDetailsByPlate from '@/components/cars/registration/CarDetailsByPlate';
import RegistrationCarDetailCard from '@/components/ui/cards/cars/RegistrationCarDetailCard';
import HorizontalLine from '@/components/ui/HorizontalLine';

function RegisterVehicleScreen() {
  const [segmentedControlSelection, setSegmentedControlSelection] =
    useState<SegmentedControlSelection | null>(options[0]);
  const [carSelectedByMakeAndModel, setCarSelectedByMakeAndModel] = useState<
    Car | undefined
  >(undefined);
  const [carSelectedByPlate, setCarSelectedByPlate] = useState<Car | undefined>(
    undefined,
  );
  const [loadingCarModels, setLoadingCarModels] = useState(false);
  const [models, setModels] = useState<Array<Car>>([]);
  const [isPlateError, setIsPlateError] = useState(false);
  const [errorYear, setErrorYear] = useState(false);
  const [makeAndModelConfirmation, setMakeAndModelConfirmation] =
    useState(false);
  const [plateConfirmation, setPlateConfirmation] = useState(false);

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
    setCarSelectedByPlate: setCarSelectedByPlateCtx,
  } = useContext(CarContext);

  const {carsMakes: makes, loadingCarsMakes} = useCarsMakes();
  const dispatch = useAppDispatch();

  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );

  const routeName = useMemo(() => {
    if (
      (segmentedControlSelection?.index === 0 && carSelectedByMakeAndModelCtx && makeAndModelConfirmation) ||
      (segmentedControlSelection?.index === 1 && carSelectedByPlateCtx && plateConfirmation)
    ) {
      return `${selectedWorkshop ? 'ReviewBookingDetailsScreen' : 'WorkshopsListScreen'}`;
    }
    return '';
  }, [
    carSelectedByMakeAndModelCtx,
    makeAndModelConfirmation,
    carSelectedByPlateCtx,
    plateConfirmation,
    selectedWorkshop,
  ]);

  useEffect(() => {
    setErrorYear(false);
  }, [segmentedControlSelection]);

  const buttonIsEnabled = useMemo(() => {
    return (
      (segmentedControlSelection?.index === 0 &&
        carSelectedByMakeAndModelCtx &&
        !!carSelectedByMakeAndModelCtx.engineDisplacement &&
        !!carSelectedByMakeAndModelCtx.fuel &&
        !!carSelectedByMakeAndModelCtx.year &&
        !!carSelectedByMakeAndModelCtx.mileage &&
        !errorYear) ||
      (segmentedControlSelection?.index === 1 &&
        carSelectedByPlateCtx &&
        !!carSelectedByPlateCtx.plateNumber &&
        !!carSelectedByPlateCtx.engineDisplacement &&
        !!carSelectedByPlateCtx.fuel &&
        !!carSelectedByPlateCtx.year &&
        !!carSelectedByPlateCtx.mileage &&
        !errorYear)
    );
  }, [
    segmentedControlSelection,
    carSelectedByMakeAndModelCtx,
    carSelectedByPlateCtx,
    errorYear,
  ]);

  useEffect(() => {
    handleOnRightIcon();
    // if (setCarSelectedByMakeAndModelCtx) {
    //   setCarSelectedByMakeAndModelCtx(undefined);
    // }
    // if (setCarSelectedByPlateCtx) {
    //   setCarSelectedByPlateCtx(undefined);
    // }
  }, [segmentedControlSelection]);

  const backgroundStyle = {
    backgroundColor: Colors.light.backgroundLinearGradient.end,
  };

  const fetchByPlate = (plate: string) => {
    if (isPlateNumber(plate)) {
      setIsPlateError(false);
      const response = {
        ABS: '',
        AirBag: '',
        CarMake: 'MAZDA',
        CarModel: 'CX-5 2ª serie',
        Description: 'MAZDA CX-5 2ª serie',
        EngineSize: '2191',
        FuelType: 'Diesel',
        Immobiliser: '',
        KType: '',
        LicensePlate: 'FV181EX',
        MakeDescription: 'MAZDA',
        ModelDescription: 'CX-5 2ª serie',
        NumberOfDoors: '',
        PowerCV: 184,
        PowerFiscal: 21,
        PowerKW: 135,
        RegistrationYear: '2019',
        TimeStamp: 1739716456,
        Version: 'MAZDA CX-5 2.2L Skyactiv-D 184 CV aut. AWD Exceed ( 1/2019 )',
        Vin: '',
      };
      const car = {
        id: response['TimeStamp'],
        make: response['CarMake'],
        model: response['CarModel'],
        year: Number(response['RegistrationYear']),
        plateNumber: response['LicensePlate'],
        fuel: response['FuelType'] as FuelType,
        vin: response['Vin'],
        engineDisplacement: response['EngineSize'],
        name: response['Description'],
        powerCV: response['PowerCV'],
      };
      setCarSelectedByPlate(car);
      // axios.get("https://automotive.openapi.com/IT-car/FV181EX", {
      //   headers: {
      //     "accept": "application/json",
      //     "Authorization": "Bearer 67b1f7439ad74bab6d03ae1a"
      //   }
      // })
      //   .then(response => setCarSelectedByPlate(response.data.data))
      //   .catch(error => {
      //     console.error('Error:', error)
      //     setIsPlateError(true)
      //   });
    } else {
      setIsPlateError(true);
    }
  };
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
        year: null, //todo: ignorando l'year preso dal db e lo stiamo chiedendo sempre all'utente. Controllare se e' cio che desideriamo
      });
    }
  }, [carModelDropdownData]);

  useEffect(() => {
    setCarModelDropdownData(undefined);
  }, [segmentedControlSelection]);

  const handleOnRightIcon = () => {
    setCarSelectedByPlate(undefined);
    setIsPlateError(false);
    if (setCarSelectedByPlateCtx) {
      setCarSelectedByPlateCtx(undefined);
    }
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
              <ScrollView className="mt-6" automaticallyAdjustKeyboardInsets>
                {!makeAndModelConfirmation && (
                  <View>
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
                  </View>
                )}
                {makeAndModelConfirmation && carSelectedByMakeAndModelCtx && (
                  <View className="mx-3 p-4 border-2 border-grey-light rounded-xl">
                    <View className="mb-2">
                      <RegistrationCarDetailCard
                        title="Make"
                        value={carSelectedByMakeAndModelCtx.make}
                      />
                      <RegistrationCarDetailCard
                        title="Model"
                        value={carSelectedByMakeAndModelCtx.model}
                      />
                      {carSelectedByMakeAndModelCtx.year && (
                        <RegistrationCarDetailCard
                          title="Year"
                          value={carSelectedByMakeAndModelCtx.year.toString()}
                        />
                      )}
                      <RegistrationCarDetailCard
                        title="Engine displacement"
                        value={carSelectedByMakeAndModelCtx.engineDisplacement!}
                      />
                      <RegistrationCarDetailCard
                        title="Fuel"
                        value={carSelectedByMakeAndModelCtx.fuel}
                      />
                      {carSelectedByMakeAndModelCtx.mileage && (
                        <RegistrationCarDetailCard
                          title="Mileage"
                          value={carSelectedByMakeAndModelCtx.mileage.toString()}
                        />
                      )}
                    </View>
                    <HorizontalLine />
                    <Pressable
                      onPress={() => {
                        setMakeAndModelConfirmation(false);
                        if (setCarSelectedByMakeAndModelCtx) {
                          setCarSelectedByMakeAndModelCtx(undefined);
                        }
                      }}
                    >
                      <Text className="text-base font-medium mt-2 text-orange-500">
                        Change
                      </Text>
                    </Pressable>
                  </View>
                )}
              </ScrollView>
            )}
            {segmentedControlSelection?.index === 1 && (
              <ScrollView className="mx-4" automaticallyAdjustKeyboardInsets>
                {!plateConfirmation ? (
                  <View>
                    <TicDriveInput
                      placeholder={segmentedControlSelection.placeholder ?? ''}
                      isRightIcon={true}
                      isTextUppercase={true}
                      onRightIcon={handleOnRightIcon}
                      onSubmit={value => fetchByPlate(value)}
                      containerStyle={{height: 85}}
                    />
                    {isPlateError && (
                      <Text className="font-medium text-md text-red-500 text-center">
                        Insert a valid plate number. Format: AA123BB
                      </Text>
                    )}
                    {!isPlateError && carSelectedByPlate && (
                      <CarDetailsByPlate
                        key={carModelDropdownData?.id}
                        carSelected={carSelectedByPlate}
                        errorYear={errorYear}
                        setErrorYear={setErrorYear}
                      />
                    )}
                  </View>
                ) : (
                  <Text>confirmation</Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
      <TicDriveButton
        text="Confirm"
        onClick={() => {
          if (segmentedControlSelection?.index === 0) {
            setMakeAndModelConfirmation(true);
            if (setCarSelectedByMakeAndModelCtx) {
              setCarSelectedByMakeAndModelCtx({
                ...carSelectedByMakeAndModelCtx,
                make: carMakeDropdownData?.value,
                model: carModelDropdownData?.value,
              });
            }
          } else if (segmentedControlSelection?.index === 1) {
            setPlateConfirmation(true);
            if (setCarSelectedByPlateCtx) {
              setCarSelectedByPlateCtx({
                ...carSelectedByMakeAndModelCtx,
                make: carMakeDropdownData?.value,
                model: carModelDropdownData?.value,
              });
            }
          }
        }}
        routeName={routeName}
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
