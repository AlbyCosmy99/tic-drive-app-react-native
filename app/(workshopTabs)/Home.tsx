import {Colors} from '@/constants/Colors';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import { useAppSelector } from '@/app/stateManagement/redux/hooks';
import { globalStyles } from '@/app/globalStyles';

export default function HomeTab() {
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={isUserLogged ? true : true} />
        <View className='flex-1 justify-center items-center'>
          <Text>Workshop Home</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
