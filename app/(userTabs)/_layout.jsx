import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import ServicesIcon from '@/assets/svg/servicesIcons/services.svg';
import ServicesPressedIcon from '@/assets/svg/servicesIcons/servicesPressed.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserHome from './Home';
import UserBookings from './Bookings';
import UserChat from './Chat';
import UserAccount from './Account';
import ChooseServicesScreen from '../screens/ChooseServicesScreen';

const Tab = createBottomTabNavigator();

export default function UserTabLayout() {
  const PRESSED_COLOR = Colors.light.green.drive
  return (
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
      <Tab.Screen
        name="Chat"
        component={UserChat}
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <ChatIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ChooseServicesScreen}
        options={{
          title: 'Services',
          headerShown: false,
          tabBarIcon: ({color}) => (
            color === PRESSED_COLOR ? <ServicesPressedIcon width={28} fill={color} name="Services" /> : <ServicesIcon width={28} fill={color} name="Services" />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={UserBookings}
        options={{
          title: 'Bookings',
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
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AccountIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
