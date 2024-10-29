import {Tabs} from 'expo-router';
import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import FavouriteIcon from '../../assets/svg/favouriteIcon.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import HomeTab from './Home';
import {useAppSelector} from '../stateManagement/redux/hooks';

export default function TabLayout() {
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);

  if (!isUserLogged) {
    return <HomeTab />;
  }
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors.light.green.drive}}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <HomeIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          title: 'Bookings',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <BookingsIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Favourite"
        options={{
          title: 'Favourite',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FavouriteIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <ChatIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AccountIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
    </Tabs>
  );
}
