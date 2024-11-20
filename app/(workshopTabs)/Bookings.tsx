import {Colors} from '@/constants/Colors';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import PrenotationBookedCard from '@/components/workshop/PrenotationBookedCard';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalLine from '@/components/ui/HorizontalLine';
import { globalStyles } from '@/styles/globalStyles';

export default function WorkshopBookings() {
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={false} canGoBack={false} />
        <Text className="font-bold text-2xl text-center mb-2 mt-1">
          All Active Bookings
        </Text>
        <HorizontalLine />
        <ScrollView className="flex-1">
          <PrenotationBookedCard
            model="Alfa Romeo"
            service="Oil change"
            price="59$"
            pin={1457}
            time="TODAY - 15:30"
          />
          <PrenotationBookedCard
            model="Bmw series 3"
            service="Battery"
            price="237$"
            pin={3454}
            time="23/10 - 10:30"
          />
          <PrenotationBookedCard
            model="Pegeout 208"
            service="Oil change"
            price="59$"
            pin={2367}
            time="25/10 - 14:30"
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
