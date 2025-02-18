import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text} from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';

export default function UserBookings() {
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <View>
            <Text>bookings</Text>
          </View>
        ) : (
          <NotLogged />
        )}
      </>
    </LinearGradientViewLayout>
  );
}
