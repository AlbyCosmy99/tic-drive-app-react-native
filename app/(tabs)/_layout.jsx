import {Tabs} from 'expo-router';
import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import FavouriteIcon from '../../assets/svg/favouriteIcon.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import HomeTab from './user/Home';
import {useAppSelector} from '../stateManagement/redux/hooks';

export default function TabLayout() {
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);

  if (!isUserLogged) {
    return <HomeTab />;
  }
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors.light.green.drive}}>
      <Tabs.Screen
        name="user/Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <HomeIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/Bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({color}) => (
            <BookingsIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/Favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({color}) => (
            <FavouriteIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/Chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({color}) => (
            <ChatIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/Account"
        options={{
          title: 'user/Account',
          tabBarIcon: ({color}) => (
            <AccountIcon width={28} fill={color} name="Home" />
          ),
        }}
      />
    </Tabs>
  );
}
