import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Text, useColorScheme, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ServicesCards from '@/components/ServicesCards';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {Colors} from '@/constants/Colors';
import {useAppSelector} from '../stateManagement/redux/hooks';
import {globalStyles} from '../styles/globalStyles';
import UserLogged from '@/mock/UserLogged';
import {useLocalSearchParams} from 'expo-router';
import necessaryDeviceBottomInset from '../utils/devices/necessaryDeviceBottomInset';

export default function ChooseServicesScreen() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const user = useAppSelector(state => state.auth.user);
  const isUserLookingForServices = () => {
    return !(params && params.category === 'workshop');
  };
  const isButtonDisabled =
    params.category === 'workshop'
      ? useAppSelector(state => state.services.servicesChoosenByWorkshops)
          .length === 0
      : useAppSelector(state => state.services.servicesChoosenByUsers)
          .length === 0;

  return (
    <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
      <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.end,
        ]}
        className="flex-1 absolute w-full h-full"
      />
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="flex-1 justify-between">
          <Text
            style={{
              color:
                colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
            }}
            className="font-medium text-3xl mx-3.5 mb-2"
          >
            {user ? `${user?.name ? user.name : 'Andrei'}, w` : 'W'}hat service
            {isUserLookingForServices() ? '' : 's'}{' '}
            {isUserLookingForServices()
              ? 'are you looking for'
              : 'do you want to offer'}
            ?
          </Text>
          <ServicesCards
            isSingleChoice={isUserLookingForServices() ? true : false}
            type={isUserLookingForServices() ? 'user' : 'workshop'}
          />
        </View>
        <TicDriveButton
          text={isUserLookingForServices() ? 'Book a service' : 'Continue'}
          path={
            isUserLookingForServices()
              ? './RegisterVehicle'
              : '/screens/UserAuthentification?register=1&user=0'
          }
          disabled={isButtonDisabled}
        />
      </SafeAreaView>
    </View>
  );
}
