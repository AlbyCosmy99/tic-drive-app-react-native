import {Colors} from '@/constants/Colors';
import {SafeAreaView, Text} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import {useAppSelector} from '@/app/stateManagement/redux/hooks';
import {globalStyles} from '@/app/styles/globalStyles';

export default function UserAccount() {
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
        <Text className="font-bold text-2xl text-center mb-2 mt-1">
          User Account
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
