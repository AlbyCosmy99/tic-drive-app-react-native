import React, { useState, useRef, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  GestureResponderEvent,
  PanResponderGestureState,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import TicDriveButton from '../buttons/TicDriveButton';
import { Colors } from '@/constants/Colors';
import Day from '@/types/calendar/Day';
import UserTimeSlot from '@/constants/temp/UserTimeSlots';
import { useAppSelector } from '@/stateManagement/redux/hooks';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';

const { height } = Dimensions.get('window');

const UserCalendarModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);
  const {setLoginRouteName} = useContext(AuthContext);

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
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
    })
  ).current;

  return (
    <>
      <TicDriveButton
        text="Book a service"
        onClick={openModal}
        customButtonStyle={styles.customButtonStyle}
      />
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
              style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
              {...panResponder.panHandlers}
            >
              <View style={styles.dragHandle} />
              <View className='mb-2' style={styles.scrollContent}>
                <Text className='text-base mt-2 mb-1'>Select a Date</Text>
                <Calendar
                  onDayPress={(day: Day) => {
                    if(selectedDate === day.dateString) {
                      setSelectedDate(null)
                      setSelectedTime(null)
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
                  }}
                  theme={{
                    selectedDayTextColor: 'white', // Text color for the selected day
                    todayTextColor: Colors.light.green.drive, // Text color for today's date
                    dayTextColor: 'black', // Default text color for all days
                    textDisabledColor: Colors.light.ticText, // Text color for disabled dates
                  }}
                />
                {selectedDate && (
                  <View>
                    <Text className='text-base mt-2 mb-1'>Select a Time</Text>
                    <View className='flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center items-center mt-4'>
                      {
                        UserTimeSlot.map((time, index) => (
                          <Pressable 
                            onPress={() => setSelectedTime(selectedTime === time ? null : time)} 
                            key={index} 
                            className={`border border-tic rounded-2xl p-1 px-2 ${selectedTime === time && 'bg-drive'}`} 
                            style={styles.timeSlotContainer}>
                            <Text className={`text-tic text-base text-center ${selectedTime === time && 'text-black'}`}>{time}</Text>
                          </Pressable>
                        ))
                      }
                    </View>
                  </View>
                )}
                <TicDriveButton
                  text={'Confirm ' + (!isUserLogged ? 'and login' : '')}
                  disabled={!selectedDate || !selectedTime}
                  routeName={
                    isUserLogged
                      ? 'ReviewBookingDetailsScreen'
                      : 'UserAuthenticationScreen'
                  }
                  routeParams={isUserLogged ? {} : {isUser: true}}
                  replace={isUserLogged ? false : false}
                  onClick={
                    isUserLogged
                      ? () => {closeModal(); return {}}
                      : () => {closeModal(); setLoginRouteName('ReviewBookingDetailsScreen')}
                  }
                />
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
};

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
    width: '30%'
  }
});

export default UserCalendarModal;
