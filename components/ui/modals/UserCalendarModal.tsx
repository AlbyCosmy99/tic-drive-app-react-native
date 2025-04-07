import React, {
  useState,
  useRef,
  useContext,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  Pressable,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import TicDriveButton from '../buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import Day from '@/types/calendar/Day';
import UserTimeSlot from '@/constants/temp/UserTimeSlots';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useTranslation} from 'react-i18next';

const {height} = Dimensions.get('window');

export interface UserCalendarModalRef {
  openModal: () => void;
  closeModal: () => void;
}

interface UserCalendarModalProps {
  showButton?: boolean;
}

const UserCalendarModal = forwardRef<
  UserCalendarModalRef,
  UserCalendarModalProps
>(({showButton = true}, ref) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const token = useJwtToken();
  const {setLoginRouteName, setLoginRouteParams} = useContext(AuthContext);
  const workshop = useAppSelector(state => state.workshops.selectedWorkshop);
  const service = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  )[0];
  const carSelected = useAppSelector(state => state.cars.selectedCar);
  const {t} = useTranslation();

  const buttonText = useMemo(() => {
    if (!service) {
      return t('service.chooseService');
    } else if (!carSelected) {
      return 'Register car';
    }
    return 'Confirm ' + (!token ? 'and login' : '');
  }, [token, service, carSelected]);

  const routeName = useMemo(() => {
    if (!service) {
      return 'ChooseServicesScreen';
    }
    return token
      ? carSelected
        ? 'ReviewBookingDetailsScreen'
        : 'RegisterVehicleScreen'
      : 'UserAuthenticationScreen';
  }, [token, service]);

  const openModal = (): void => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Bring to the top of the screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = (): void => {
    Animated.timing(slideAnim, {
      toValue: height, // Slide it off the screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Expose methods to parent components using the ref.
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const onClick = () => {
    if (token) {
      closeModal();
      return {};
    }
    closeModal();
    setLoginRouteName('ReviewBookingDetailsScreen');
    setLoginRouteParams({workshop, date: selectedDate, time: selectedTime});
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.timing(slideAnim, {
            toValue: 0, // Reset to its original position
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  // Array of custom days to disable
  const customDisabledDays = [
    '2024-12-08',
    '2024-12-10',
    '2024-12-15',
    '2025-04-16',
  ];

  // Generate disabled dates object
  const generateDisabledDates = () => {
    const today = new Date();
    const disabledDates: Record<string, {disabled: boolean}> = {};

    // Disable all past dates
    for (
      let d = new Date(today.setDate(today.getDate() - 1));
      d >= new Date(2000, 0, 1);
      d.setDate(d.getDate() - 1)
    ) {
      const dateStr = d.toISOString().split('T')[0];
      disabledDates[dateStr] = {disabled: true};
    }

    // Add custom disabled days
    customDisabledDays.forEach(day => {
      disabledDates[day] = {disabled: true};
    });

    return disabledDates;
  };

  const disabledDates = generateDisabledDates();

  return (
    <>
      {showButton && (
        <TicDriveButton
          text={
            service?.title
              ? t('service.bookTheService')
              : t('service.bookAService')
          }
          onClick={openModal}
          customButtonStyle={styles.customButtonStyle}
          customContainerStyle={{width: '100%'}}
        />
      )}

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.overlay} onPress={closeModal} />
            <Animated.View
              style={[
                styles.modalContent,
                {transform: [{translateY: slideAnim}]},
              ]}
              {...panResponder.panHandlers}
            >
              <View style={styles.dragHandle} />
              <View className="mb-2" style={styles.scrollContent}>
                <Text className="text-sm mt-2 mb-1 text-tic">
                  {t('date.selectADate').toUpperCase()}
                </Text>
                <Calendar
                  onDayPress={(day: Day) => {
                    if (disabledDates[day.dateString]) return;
                    if (selectedDate === day.dateString) {
                      setSelectedDate(null);
                      setSelectedTime(null);
                    } else {
                      setSelectedDate(day.dateString);
                    }
                  }}
                  markedDates={{
                    [selectedDate ?? '']: {
                      selected: true,
                      marked: false,
                      selectedColor: Colors.light.green.drive,
                    },
                    ...disabledDates,
                  }}
                  theme={{
                    selectedDayTextColor: 'white', // Text color for the selected day
                    todayTextColor: Colors.light.green.drive, // Text color for today's date
                    dayTextColor: 'black', // Default text color for all days
                    textDisabledColor: '#b3b3b3', // Text color for disabled dates
                  }}
                />
                {selectedDate && (
                  <View className="mb-4">
                    <Text className="text-sm text-tic mt-4">
                      CHOOSE FROM AVAILABLE SLOTS
                    </Text>
                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center items-center mt-4">
                      {UserTimeSlot.map((time, index) => (
                        <Pressable
                          onPress={() =>
                            setSelectedTime(selectedTime === time ? null : time)
                          }
                          key={index}
                          className={`border border-tic rounded-2xl p-1 px-2 ${
                            selectedTime === time && 'bg-drive border-drive'
                          }`}
                          style={styles.timeSlotContainer}
                        >
                          <Text
                            className={`text-tic text-base text-center ${
                              selectedTime === time && 'text-black'
                            }`}
                          >
                            {time}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}
                <TicDriveButton
                  text={buttonText}
                  disabled={!selectedDate || !selectedTime}
                  routeName={routeName}
                  routeParams={
                    token
                      ? {workshop, date: selectedDate, time: selectedTime}
                      : {isUser: true}
                  }
                  replace={token ? false : false}
                  onClick={onClick}
                />
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 0,
    maxHeight: height * 0.9, // Allow up to 90% of screen height
  },
  dragHandle: {
    width: 60,
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  selectedDateText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#007BFF',
  },
  customButtonStyle: {
    height: 50,
    paddingHorizontal: 15,
  },
  timeSlotContainer: {
    width: '30%',
    borderColor: '',
  },
});

export default UserCalendarModal;
