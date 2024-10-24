import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {
  SafeAreaView,
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
} from '../../constants/VehicleRegistrationOptions';
import GlobalContext from '../stateManagement/contexts/GlobalContext';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import SegmentedControlSelection from '../types/SegmentedControlSelection';
import Car from '../types/Car';
import defaultCar from '@/constants/defaultRegistrationCar';
import cars from '@/constants/temp/Cars';
import {globalStyles} from '../styles/globalStyles';
import necessaryDeviceBottomInset from '../utils/devices/necessaryDeviceBottomInset';

function RegisterVehicle() {
  const [segmentedControlSelection, setSegmentedControlSelection] =
    useState<SegmentedControlSelection | null>(null);
  const [carSelected, setCarSelected] = useState<Car>(defaultCar);
  const {carNotFound, setCarNotFound} = useContext(GlobalContext);
  const [isCarSearched, setIsCarSearched] = useState(false);

  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'light'
        ? Colors.light.backgroundLinearGradient.end
        : Colors.dark.background,
  };

  useEffect(() => {
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
    <SafeAreaView
      style={[backgroundStyle, globalStyles().safeAreaView]}
      className={`flex-1 ${necessaryDeviceBottomInset()}`}
    >
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
        <SegmentedControl
          segmentedControlSelection={segmentedControlSelection}
          setSegmentedControlSelection={setSegmentedControlSelection}
        />
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
                    className="font-semibold mx-3.5 mt-3.5 mb-0 text-lg"
                    key={index}
                  >
                    {option.inputLabel}
                  </Text>
                  <TicDriveInput
                    placeholder={option.placeholder}
                    isRightIcon={true}
                    isTextUppercase={true}
                    onRightIcon={handleOnRightIcon}
                    onSubmit={value => {
                      const car = cars.find(
                        car =>
                          car[option.keyString as CarRegistrationOptions]
                            ?.toLowerCase()
                            .trim() === value.toLowerCase().trim(),
                      );
                      setCarSelected(car ? car : defaultCar);
                      setIsCarSearched(true);
                    }}
                  />
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
        path='../(userTabs)/Home'
        disabled={carNotFound}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookingDetailsContainer: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.SegmentedControlBackground,
  },
  carDetailContainer: {
    borderBottomColor: Colors.light.SegmentedControlBackground,
  },
});

export default RegisterVehicle;
