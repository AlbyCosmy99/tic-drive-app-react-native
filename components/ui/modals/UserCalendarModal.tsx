import {
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
    if (!service) return t('service.chooseService');
    if (!carSelected) return 'Register car';
    return 'Confirm ' + (!token ? 'and login' : '');
  }, [token, service, carSelected]);

  const routeName = useMemo(() => {
    if (!service) return 'ChooseServicesScreen';
    return token
      ? carSelected
        ? 'ReviewBookingDetailsScreen'
        : 'RegisterVehicleScreen'
      : 'UserAuthenticationScreen';
  }, [token, service]);

  const openModal = (): void => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = (): void => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

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
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const workingDays = ['monday', 'tuesday', 'friday'];
  const customDisabledDays = [
    '2024-12-08',
    '2024-12-10',
    '2024-12-15',
    '2025-05-20',
  ];

  const workingHours = {
    1: ['8:30', '12:30', '14:30', '18:30'],
    2: ['8:30', '12:30', '14:30', '18:30'],
    3: ['8:30', '12:30', '14:30', '18:30'],
    4: ['8:30', '12:30', '14:30', '18:30'],
    5: ['8:30', '12:30', '14:30', '18:30'],
  }

  const range = ['8:30', '12:30', '14:30', '18:30'] //workingHours[2]

  const daysToCheck = 180;
  const maxBookingDate = new Date(Date.now() + daysToCheck * 86400000);

  const generateDisabledDates = () => {
    const disabledDates: Record<string, {disabled: boolean}> = {};
    const today = new Date();

    for (let i = 0; i <= daysToCheck; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date
        .toLocaleDateString('en-US', {weekday: 'long'})
        .toLowerCase();

      if (!workingDays.includes(dayOfWeek)) {
        disabledDates[dateStr] = {disabled: true};
      }
    }

    customDisabledDays.forEach(day => {
      disabledDates[day] = {disabled: true};
    });

    const pastLimit = new Date(today);
    pastLimit.setDate(today.getDate() - 1);
    for (
      let d = new Date(pastLimit);
      d >= new Date(2000, 0, 1);
      d.setDate(d.getDate() - 1)
    ) {
      const dateStr = d.toISOString().split('T')[0];
      disabledDates[dateStr] = {disabled: true};
    }

    return disabledDates;
  };

  const disabledDates = generateDisabledDates();

  const isDateAfterMaxRange = (dateString: string | null): boolean => {
    if (!dateString) return false;
    return new Date(dateString) > maxBookingDate;
  };

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
          transparent
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

                <View style={styles.fixedCalendarContainer}>
                  <Calendar
                    onDayPress={(day: Day) => {
                      const dayOfWeek = new Date(day.dateString)
                        .toLocaleDateString('en-US', {weekday: 'long'})
                        .toLowerCase();

                      if (
                        disabledDates[day.dateString] ||
                        !workingDays.includes(dayOfWeek)
                      )
                        return;

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
                    maxDate={maxBookingDate.toISOString().split('T')[0]}
                    theme={{
                      selectedDayTextColor: 'white',
                      todayTextColor: Colors.light.green.drive,
                      dayTextColor: 'black',
                      textDisabledColor: '#b3b3b3',
                    }}
                  />
                </View>

                {isDateAfterMaxRange(selectedDate) && (
                  <View style={styles.noticeWrapper}>
                    <Text style={styles.noticeText}>
                      You can book appointments up to 6 months in advance. For
                      later dates, please contact the workshop directly.
                    </Text>
                  </View>
                )}

                {selectedDate && (
                  <View className="mb-4">
                    <Text className="text-sm text-tic mt-4">
                      {t('date.chooseSlot').toUpperCase()}
                    </Text>
                    <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center items-center mt-4">
                      {UserTimeSlot.map((time, index) => (
                        <Pressable
                          onPress={() =>
                            setSelectedTime(
                              selectedTime === time ? null : time,
                            )
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
                  replace={false}
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
    maxHeight: height * 0.9,
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
  customButtonStyle: {
    height: 50,
    paddingHorizontal: 15,
  },
  timeSlotContainer: {
    width: '30%',
  },
  fixedCalendarContainer: {
    height: 370,
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noticeWrapper: {
    marginTop: 12,
    paddingHorizontal: 10,
  },
  noticeText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },
});

export default UserCalendarModal;
