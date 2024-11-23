import {Colors} from '@/constants/Colors';
import {SafeAreaView, Text} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalLine from '@/components/ui/HorizontalLine';
import PrenotationRequestCard from '@/components/workshop/PrenotationRequestCard';
import { globalStyles } from '@/styles/globalStyles';
export default function WorkshopRequests() {
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
          All Requests
        </Text>
        <HorizontalLine />
        <ScrollView className="flex-1">
          <PrenotationRequestCard
            model="Alfa Romeo"
            service="Oil change"
            price="59$"
            pin={1457}
            time="TODAY - 15:30"
            number={8}
          />
          <PrenotationRequestCard
            model="Alfa Romeo"
            service="Oil change"
            price="59$"
            pin={1457}
            time="TODAY - 15:30"
            number={9}
          />
          <PrenotationRequestCard
            model="Alfa Romeo"
            service="Oil change"
            price="59$"
            pin={1457}
            time="TODAY - 15:30"
            number={10}
          />
          <PrenotationRequestCard
            model="Alfa Romeo"
            service="Oil change"
            price="59$"
            pin={1457}
            time="TODAY - 15:30"
            number={11}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
