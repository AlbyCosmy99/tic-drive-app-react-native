import {Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';

export default function WorkshopAccount() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
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
          <HorizontalLine height={2} />
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
