import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text} from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

export default function UserBookings() {
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <View>
            <Text>bookings</Text>
          </View>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
