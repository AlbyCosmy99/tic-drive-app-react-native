import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import FavouriteIcon from '../../assets/svg/favouriteIcon.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import HomeTab from './Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserHome from './Home';
import UserBookings from './Bookings';
import UserFavourite from './Favourite';
import UserChat from './Chat';
import UserAccount from './Account';
import useJwtToken from '@/hooks/auth/useJwtToken';

const Tab = createBottomTabNavigator();

export default function UserTabLayout() {
  const token = useJwtToken()
  console.log(token);

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
        name="Favourite"
        component={UserFavourite}
        options={{
          title: 'Favourite',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FavouriteIcon width={28} fill={color} name="Home" />
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
        name="Account"
        component={UserAccount}
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AccountIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
