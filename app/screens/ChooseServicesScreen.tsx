import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Text, useColorScheme, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ServicesCards from '@/components/ServicesCards';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {Colors} from '@/constants/Colors';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {globalStyles} from '@/styles/globalStyles';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useRoute} from '@react-navigation/native';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

export default function ChooseServicesScreen() {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const user = useAppSelector(state => state.auth.user);

  //@ts-ignore
  const {category} = route?.params;

  const isUserLookingForServices = () => {
    return !(category === 'workshop');
  };

  const isButtonDisabled =
    category === 'workshop'
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
      <SafeAreaViewLayout>
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
          routeName={
            isUserLookingForServices()
              ? 'RegisterVehicleScreen'
              : 'UserAuthenticationScreen'
          }
          routeParams={
            isUserLookingForServices() ? {} : {register: true, isUser: false}
          }
          disabled={isButtonDisabled}
        />
      </SafeAreaViewLayout>
    </View>
  );
}
