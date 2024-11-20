import {Colors} from '@/constants/Colors';
import {SafeAreaView, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import {useAppSelector} from '@/app/stateManagement/redux/hooks';
import HorizontalLine from '@/components/ui/HorizontalLine';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import { globalStyles } from '@/styles/globalStyles';

export default function WorkshopAccount() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar
          isLoginAvailable={user ? true : true}
          canGoBack={false}
        />
        <View className="my-3">
          <Text className="font-bold text-xl text-center mb-2">
            Quick Settings
          </Text>
          <HorizontalLine />
          <View className="mx-6 mb-3">
            <TicDriveButton text="Update availability" />
            <TicDriveButton text="Change prices" />
            <TicDriveButton text="Change services offered" />
          </View>
          <HorizontalLine height={2}/>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
