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
import GlobalContext from '@/stateManagement/contexts/GlobalContext';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import CarMake from '@/types/cars/CarMake';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import getCarsMakes from '@/services/http/requests/cars/getCarsMakes';
import getCarModelsByCarMakeId from '@/services/http/requests/cars/getCarModelsByCarMakeId';
import CarDetailsByMakeAndModel from '@/components/cars/registration/CarDetailsByMakeAndModel';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import BoldTitle1 from '@/components/ui/text/BoldTitle1';

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
  const [makes, setMakes] = useState<Array<CarMake>>([]);
  const [models, setModels] = useState<Array<Car>>([]);

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

  const servicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  // useEffect(() => {
  //   if(setCarSelectedByMakeAndModelCtx) {
  //     setCarSelectedByMakeAndModelCtx({...carSelectedByMakeAndModelCtx, carMake: carMakeDropdownData?.value})
  //   }
  // }, [carMakeDropdownData])

  useEffect(() => {
    console.log('Context Updated: ', carSelectedByMakeAndModelCtx);
    console.log(carSelectedByMakeAndModelCtx?.engineDisplacement);
  }, [carSelectedByMakeAndModelCtx]);

  useEffect(() => {
    console.log(carSelectedByMakeAndModelCtx);
  }, [carSelectedByMakeAndModelCtx]);

  const buttonIsEnabled = useMemo(() => {
    return (
      segmentedControlSelection?.index === 0 &&
      carSelectedByMakeAndModelCtx &&
      !!carSelectedByMakeAndModelCtx.engineDisplacement &&
      !!carSelectedByMakeAndModelCtx.fuel &&
      !!carSelectedByMakeAndModelCtx.mileage &&
      !!carSelectedByMakeAndModelCtx.plateNumber
    );
  }, [segmentedControlSelection, carSelectedByMakeAndModelCtx]);

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'light'
        ? Colors.light.backgroundLinearGradient.end
        : Colors.dark.background,
  };

  useEffect(() => {
    const getMakes = async () => {
      const data = await getCarsMakes();
      setMakes(data);
    };
    getMakes();
  }, []);

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
      const car = models.find(model => model.id === carModelDropdownData.id)
      setCarSelectedByMakeAndModel({...car, make: carMakeDropdownData?.value, model: carModelDropdownData?.value });
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
  };

  return (
    <SafeAreaViewLayout styles={[backgroundStyle]}>
      <ToPreviousPage containerClassName="m-2 mb-7" />
      <View className="flex-1 justify-between">
        <BoldTitle1 title='Register your vehicle for service bookings' />
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
          {options.map((option, index) => {
            return (
              ((!segmentedControlSelection && index === 0) ||
                (segmentedControlSelection &&
                  segmentedControlSelection.name === option.name)) && (
                <View key={index} className="h-full">
                  <Text
                    className="font-semibold mx-3.5 my-3.5 mb-0 text-lg"
                    key={index}
                  >
                    {option.inputLabel}
                  </Text>
                  {option.keyString === 'plateNumber' && (
                    <TicDriveInput
                      placeholder={option.placeholder}
                      isRightIcon={true}
                      isTextUppercase={true}
                      onRightIcon={handleOnRightIcon}
                      onSubmit={value => {
                        const car = cars.find(
                          car =>
                            //@ts-ignore
                            car[option.keyString as CarRegistrationOptions]
                              ?.toLowerCase()
                              .trim() === value.toLowerCase().trim(),
                        );
                        setCarSelectedByPlate(car ? car : defaultCar);
                        setIsCarSearched(true);
                      }}
                    />
                  )}
                  {option.keyString === 'make and model' && (
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
                        />
                      )}
                    </ScrollView>
                  )}
                  {carNotFound && isCarSearched && (
                    <Text className="text-base mx-auto text-red-600">
                      Car not found. Try again.
                    </Text>
                  )}
                </View>
              )
            );
          })}
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
      {/* <TicDriveButton
        text="Confirm"
        routeName="userTabs"
        stateRouteName="Home"
        disabled={!buttonIsEnabled}
      /> */}
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
