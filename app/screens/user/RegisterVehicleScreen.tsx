import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SegmentedControl from '@/components/SegmentedControl';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext, useEffect, useState} from 'react';
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
import CarModel from '@/types/cars/CarModel';

function RegisterVehicleScreen() {
  const [segmentedControlSelection, setSegmentedControlSelection] =
    useState<SegmentedControlSelection | null>(null);
  const [carSelected, setCarSelected] = useState<Car>(defaultCar);
  const {carNotFound, setCarNotFound} = useContext(GlobalContext);
  const [isCarSearched, setIsCarSearched] = useState(false);
  const [loadingCarModels, setLoadingCarModels] = useState(false)
  const [makes, setMakes] = useState<Array<CarMake>>([]);
  const [models, setModels] = useState<Array<CarModel>>([]);

  const [carMakeDropdownData, setCarMakeDropdownData] = useState<TicDriveDropdownData | undefined>(undefined);
  const [carModelDropdownData, setCarModelDropdownData] = useState<TicDriveDropdownData | undefined>(undefined);

  const [carModel, setCarModel] = useState<CarModel | undefined>(undefined)
  const colorScheme = useColorScheme();

  const servicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'light'
        ? Colors.light.backgroundLinearGradient.end
        : Colors.dark.background,
  };

  // useEffect(() => {
  //   axios.get("https://automotive.openapi.com/IT-car/FV181EX", {
  //     headers: {
  //       "accept": "application/json",
  //       "Authorization": "Bearer 67708091c8d1fe2ae006cf05"
  //     }
  //   })
  //     .then(response => console.log(response.data))
  //     .catch(error => console.error('Error:', error));
  // }, [])


  useEffect(() => {
    const getMakes = async () => {
      const data = await getCarsMakes()
      setMakes(data)
    }
    getMakes()
  }, [])

  useEffect(() => {
    if(carMakeDropdownData) {
      const getModels = async () => {
        setLoadingCarModels(true)
        const data = await getCarModelsByCarMakeId(carMakeDropdownData?.id)
        setModels(data)
        setLoadingCarModels(false)
      }
      setCarModelDropdownData(undefined)
      getModels()
    }
  }, [carMakeDropdownData])

  useEffect(() => {
    if(carModelDropdownData) {
      setCarModel(models.find(model => model.id === carModelDropdownData.id))
    }
  }, [carModelDropdownData])

  useEffect(() => {
    console.log(servicesChoosen);
    if (carSelected.id === 0) {
      setCarNotFound(true);
    } else {
      setCarNotFound(false);
    }
  }, [carSelected]);

  const handleOnRightIcon = () => {
    setCarSelected(defaultCar);
    setIsCarSearched(false);
  };

  return (
    <SafeAreaViewLayout styles={[backgroundStyle]}>
      <ToPreviousPage containerClassName="m-2 mb-7" />
      <View className="flex-1 justify-between">
        <Text
          style={{
            color:
              colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
          }}
          className="font-medium mb-2 text-3xl mx-3.5"
        >
          Register your vehicle for service bookings
        </Text>
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
                <View key={index}>
                  <Text
                    className="font-semibold mx-3.5 my-3.5 mb-0 text-lg"
                    key={index}
                  >
                    {option.inputLabel}
                  </Text>
                  {
                    option.keyString === 'plateNumber' && (
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
                          setCarSelected(car ? car : defaultCar);
                          setIsCarSearched(true);
                        }}
                      />
                    )
                  }
                  {
                    option.keyString === 'make and model' && (
                      <View className='mt-6 px-4'
                  
                      >
                        <TicDriveDropdown data={makes.map(make => ({id: make.id, value: make.name}))} value={carMakeDropdownData} setValue={setCarMakeDropdownData} placeholder='Select car make' searchPlaceholder='Search make' />
                          <TicDriveDropdown data={models ? models.map(model => ({id: model.id, value: model.name})) : []} value={carModelDropdownData} setValue={setCarModelDropdownData} placeholder='Select car model' searchPlaceholder='Search model' disabled={!carMakeDropdownData || loadingCarModels}/>
                          {carModelDropdownData && carModel && (
                            <View
                              className="my-1 border-b mx-3"
                              style={styles.carDetailContainer}
                            >
                              <Text className="font-bold mb-0.5 text-lg">Year</Text>
                              {
                                false ? (
                                  <Text className="text-lg mb-1.5">{carModel.year}</Text>
                                ) : (
                                  <TicDriveInput  placeholder='Insert car year' isRightIcon />
                                )
                              }
                          </View>
                        )}
                      </View>
                    )
                  }
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
            {carSelected.id > 0 && (
              <View className="mx-3.5">
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">Model</Text>
                  <Text className="text-lg mb-1.5">{carSelected.model}</Text>
                </View>
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">Plate number</Text>
                  <Text className="text-lg mb-1.5">
                    {carSelected.plateNumber}
                  </Text>
                </View>
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">VIN</Text>
                  <Text className="text-lg mb-1.5">{carSelected.vin}</Text>
                </View>
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">Liters</Text>
                  <Text className="text-lg mb-1.5">{carSelected.liters}</Text>
                </View>
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">Energy</Text>
                  <Text className="text-lg mb-1.5">{carSelected.energy}</Text>
                </View>
                <View
                  className="my-1 border-b"
                  style={styles.carDetailContainer}
                >
                  <Text className="font-bold mb-0.5 text-lg">Engine code</Text>
                  <Text className="text-lg mb-1.5">
                    {carSelected.engineCode}
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
                    {carSelected.engineDisplacement}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <TicDriveButton
        text="Confirm"
        routeName="userTabs"
        stateRouteName="Home"
        disabled={carNotFound}
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
