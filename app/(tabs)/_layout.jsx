import { Tabs } from 'expo-router';
import {Colors} from '../../constants/Colors'
import HomeIcon from '../../assets/svg/homeIcon.svg'
import BookingsIcon from '../../assets/svg/bookingsIcon.svg'
import FavouriteIcon from '../../assets/svg/favouriteIcon.svg'
import ChatIcon from '../../assets/svg/chatIcon.svg'
import AccountIcon from '../../assets/svg/accountIcon.svg'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.light.green.drive }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon width={28} fill={color} name="Home"/>,
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <BookingsIcon width={28} fill={color} name="Home"/>
        }}
      />
      <Tabs.Screen
        name="Favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <FavouriteIcon width={28} fill={color} name="Home"/>,
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <ChatIcon width={28} fill={color} name="Home"/>,
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <AccountIcon width={28} fill={color} name="Home"/>,
        }}
      />
    </Tabs>
  );
}
