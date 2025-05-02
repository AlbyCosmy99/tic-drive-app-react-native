import {Colors} from '../../constants/Colors';
import HomeIcon from '@/components/svgs/HomeIcon';
import BookingsIcon from '@/components/svgs/BookingsIcon';
import ServicesIcon from '@/components/svgs/servicesIcons/Services';
import ServicesPressedIcon from '@/components/svgs/servicesIcons/ServicesPressed';
import ChatIcon from '@/components/svgs/ChatIcon';
import AccountIcon from '@/components/svgs/AccountIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserHome from './Home';
import UserBookings from './Bookings';
import UserChat from './Chat';
import UserAccount from './Account';
import ChooseServicesScreen from '../screens/ChooseServicesScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function UserTabLayout() {
  const {t} = useTranslation();

  const PRESSED_COLOR = Colors.light.green.drive;
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: PRESSED_COLOR,
        }}
      >
        <Tab.Screen
          name="Home"
          component={UserHome}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <HomeIcon width={28} fill={color} name="Home" />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Chat"
          component={UserChat}
          options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <ChatIcon width={28} fill={color} name="Home" />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Services"
          component={ChooseServicesScreen}
          options={{
            title: t('services'),
            headerShown: false,
            tabBarIcon: ({color}) =>
              color === PRESSED_COLOR ? (
                <ServicesPressedIcon width={28} fill={color} name="Services" />
              ) : (
                <ServicesIcon width={28} fill={color} name="Services" />
              ),
          }}
          initialParams={{
            buttonContainerTailwindCss: 'pb-1',
            withSafeAreaView: false,
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={UserBookings}
          options={{
            title: t('bookings.title'),
            headerShown: false,
            tabBarIcon: ({color}) => (
              <BookingsIcon width={28} fill={color} name="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserAccount}
          options={{
            title: t('account'),
            headerShown: false,
            tabBarIcon: ({color}) => (
              <AccountIcon width={28} fill={color} name="Home" />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
