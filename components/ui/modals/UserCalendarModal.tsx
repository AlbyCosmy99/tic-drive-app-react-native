import {
  useState,
  useRef,
  useContext,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
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
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useTranslation} from 'react-i18next';
import generateTimeSlots from '@/utils/datetime/generateTimeSlots';
import {ScrollView} from 'react-native-gesture-handler';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import getWorkshopNotAvailableDates from '@/services/http/requests/datetime/getWorkshopNotAvailableDates';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import ExtendedDay from '@/types/calendar/ExtendedDay';
import {Day} from '@/types/calendar/Day';
import CrossPlatformButtonLayout from '../buttons/CrossPlatformButtonLayout';

const {height} = Dimensions.get('window');

export interface UserCalendarModalRef {
  openModal: () => void;
  closeModal: () => void;
}

interface UserCalendarModalProps {
  showButton?: boolean;
  workshopId: string;
}

const UserCalendarModal = forwardRef<
  UserCalendarModalRef,
  UserCalendarModalProps
>(({showButton = true, workshopId}, ref) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const token = useJwtToken();
  const {setErrorMessage} = useGlobalErrors();
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

  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [customDisabledDays, setCustomeDisabledDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: {
          data: {
            days: Day[];
            dates: string[];
          };
        } = await getWorkshopNotAvailableDates(workshopId);

        setWorkingDays(data.data.days.map(day => day.name));
        const mappedDisabledDays = data.data.dates.map(
          date => date.split('T')[0],
        );
        setCustomeDisabledDays(mappedDisabledDays);
      } catch (error) {
        setErrorMessage('Errore nel recupero delle date non disponibili');
      }
    };

    fetchData();
  }, []);

  const range = {
    Morning: ['8:30', '12:30'],
    Afternoon: ['14:30', '18:30'],
  };

  const userTimeSlot = useMemo(() => {
    return Object.entries(range).map(([label, [start, end]]) => ({
      label,
      slots: generateTimeSlots(start, end),
    }));
  }, [range]);

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

      if (workingDays.includes(dayOfWeek)) {
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
              <SafeAreaViewLayout>
                <View className="justify-between flex-1">
                  <Text style={styles.sectionTitle}>
                    {t('date.selectADate').toUpperCase()}
                  </Text>

                  <View style={styles.fixedCalendarContainer}>
                    <Calendar
                      onDayPress={(day: ExtendedDay) => {
                        const dayOfWeek = new Date(day.dateString)
                          .toLocaleDateString('en-US', {weekday: 'long'})
                          .toLowerCase();

                        if (
                          disabledDates[day.dateString] ||
                          workingDays.includes(dayOfWeek) // fix here
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
                    <ScrollView style={{marginBottom: 20}}>
                      <Text style={styles.sectionTitle}>
                        {t('date.chooseSlot').toUpperCase()}
                      </Text>

                      {userTimeSlot.map(({label, slots}) => (
                        <View key={label} style={styles.timeSlotSection}>
                          <Text style={styles.timeSlotLabel}>
                            {label === 'Morning'
                              ? t('date.days.morning')
                              : t('date.days.afternoon')}
                          </Text>
                          <View style={styles.timeSlotGroup}>
                            {slots.map(time => (
                              <CrossPlatformButtonLayout
                                key={time}
                                onPress={() =>
                                  setSelectedTime(
                                    selectedTime === time ? null : time,
                                  )
                                }
                                styleContainer={[
                                  styles.timeSlotButton,
                                  selectedTime === time && styles.selectedSlot,
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.timeSlotText,
                                    selectedTime === time &&
                                      styles.selectedSlotText,
                                  ]}
                                >
                                  {time}
                                </Text>
                              </CrossPlatformButtonLayout>
                            ))}
                          </View>
                        </View>
                      ))}
                    </ScrollView>
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
              </SafeAreaViewLayout>
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
  customButtonStyle: {
    height: 50,
    paddingHorizontal: 15,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.light.green.drive,
  },
  timeSlotSection: {
    marginBottom: 8,
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.green.drive,
    marginBottom: 4,
    marginTop: 12,
    textAlign: 'center',
  },
  timeSlotGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  timeSlotButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.green.drive,
    margin: 4,
  },
  selectedSlot: {
    backgroundColor: Colors.light.green.drive,
    borderColor: Colors.light.green.drive,
  },
  timeSlotText: {
    fontSize: 16,
    color: Colors.light.green.drive,
  },
  selectedSlotText: {
    color: '#fff',
  },
});

export default UserCalendarModal;
