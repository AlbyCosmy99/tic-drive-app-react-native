import {Colors} from '@/constants/Colors';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import { useAppSelector } from '@/app/stateManagement/redux/hooks';
import { globalStyles } from '@/app/globalStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import PrenotationBookedCard from '@/components/workshop/PrenotationBookedCard';
import ForwardArrow from '../../assets/svg/forwardArrow.svg'
export default function HomeTab() {
  const user = useAppSelector(state => state.auth.user)

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={user ? true : true} />
        <View className='flex-1'>
          <Text className='text-center m-4 mb-2 font-bold text-xl'>Hi, Orlando AC Repairs</Text>
          <TouchableWithoutFeedback 
            className='bg-red-500 m-3 mx-6 p-2 rounded-xl flex-row justify-center items-center'
            onPress={() => router.push('/(workshopTabs)/Chat?animation=fade')}
          >
            <Text className='text-white text-center font-semibold text-lg'>3 new messages to read </Text>
            <ForwardArrow fill={'white'}/>
          </TouchableWithoutFeedback>
          <View>
            <Text className='font-bold text-2xl text-center mb-2 mt-1'>
              Active Bookings
            </Text>
            <View className='w-full justify-center items-center'>
                <View style={{height: 1, width: '90%', backgroundColor: Colors.light.ticText}}></View>
            </View>
            <PrenotationBookedCard 
              model='Alfa Romeo'
              service='Oil change'
              price='59$'
              pin={1457}
              time='TODAY - 15:30'
            />
            <PrenotationBookedCard 
              model='Bmw series 3'
              service='Battery'
              price='237$'
              pin={3454}
              time='23/10 - 10:30'  
            />
            <TouchableWithoutFeedback onPress={() => router.push('/(workshopTabs)/Bookings')}>
              <Text className='self-end mr-12 mt-1 font-medium text-xl'>View All</Text>
            </TouchableWithoutFeedback>
          </View>
          <View className='w-full justify-center items-center mt-2'>
            <View style={{height: 1, width: '90%', backgroundColor: Colors.light.ticText}}></View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

})
