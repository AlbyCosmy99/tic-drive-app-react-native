import {Colors} from '@/constants/Colors';
import {View, SafeAreaView, Text} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import { globalStyles } from '@/app/styles/globalStyles';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import PrenotationBookedCard from '@/components/workshop/PrenotationBookedCard';
import ForwardArrow from '../../assets/svg/forwardArrow.svg'
import HorizontalLine from '@/components/ui/HorizontalLine';
import PrenotationRequestCard from '@/components/workshop/PrenotationRequestCard';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
export default function HomeTab() {
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={false} />
        <View className='flex-1'>
          <Text className='text-center m-3 mb-2 font-bold text-2xl'>Hi, Orlando AC Repairs</Text>
          <TouchableWithoutFeedback 
            className='bg-red-500 m-3 mx-6 p-2 rounded-xl flex-row justify-center items-center'
            onPress={() => router.push('/(workshopTabs)/Chat?animation=fade')}
          >
            <Text className='text-white text-center font-semibold text-lg'>3 new messages to read </Text>
            <ForwardArrow fill={'white'}/>
          </TouchableWithoutFeedback>
          <ScrollView>
            <View>
              <Text className='font-bold text-xl text-center mb-2 mt-1'>
                Most Recent Active Bookings
              </Text>
              <HorizontalLine />
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
                <Text className='self-end mr-12 mt-1 font-medium text-xl mb-2'>View All Bookings</Text>
              </TouchableWithoutFeedback>
            </View>
            <HorizontalLine height={2}/>
            <View className='my-3'>
              <Text className='font-bold text-xl text-center mb-2'>
                Most Recent Waiting Requests
              </Text>
              <HorizontalLine />
              <PrenotationRequestCard 
                model='Alfa Romeo'
                service='Oil change'
                price='59$'
                pin={1457}
                time='TODAY - 15:30'
                number={8}
              />
              <PrenotationRequestCard 
                model='Bmw series 3'
                service='Battery'
                price='237$'
                pin={3454}
                time='23/10 - 10:30' 
                number={9} 
              />
              <TouchableWithoutFeedback onPress={() => router.push('/(workshopTabs)/Requests')}>
                <Text className='self-end mr-12 mt-1 font-medium text-xl mb-1'>View All Requests</Text>
              </TouchableWithoutFeedback>
            </View>
            <HorizontalLine height={2} />
            <View className='my-3'>
              <Text className='font-bold text-xl text-center mb-2'>
                Quick Settings
              </Text>
              <HorizontalLine />
              <View className='mx-6 mb-3'>
                <TicDriveButton text='Update availability'/>
                <TicDriveButton text='Change prices'/>
                <TicDriveButton text='Change services offered'/>
              </View>
              <HorizontalLine />
              <TouchableWithoutFeedback onPress={() => router.push('/(workshopTabs)/Account')}>
                <Text className='self-end mr-12 mt-3 font-medium text-xl mb-1'>View All Settings</Text>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}