import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import ServicesIcon from '@/assets/svg/servicesIcons/services.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import HomeTab from './Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserHome from './Home';
import UserBookings from './Bookings';
import UserChat from './Chat';
import UserAccount from './Account';
import useJwtToken from '@/hooks/auth/useJwtToken';
import ChooseServicesScreen from '../screens/ChooseServicesScreen';

const Tab = createBottomTabNavigator();

export default function UserTabLayout() {
  const token = useJwtToken();

  if (!token) {
    return <HomeTab />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.green.drive,
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
            <ServicesIcon width={28} fill={color} name="Services" />
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
