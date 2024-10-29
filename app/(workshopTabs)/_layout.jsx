import {Tabs} from 'expo-router';
import {Colors} from '../../constants/Colors';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import FavouriteIcon from '../../assets/svg/favouriteIcon.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import HomeTab from './Home';
import {useAppSelector} from '../stateManagement/redux/hooks';
import { Text, View } from 'react-native';

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
            <BookingsIcon width={28} fill={color} name="Bookings" />
          ),
        }}
      />
       <Tabs.Screen
        name="Requests"
        options={{
          title: 'Requests',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View style={{position: 'relative', padding: 10}}>
              <BookingsIcon width={28} fill={color} name="Requests" />
              <View style={{backgroundColor: 'green', borderRadius: 50, position: 'absolute', right: 0, top:2,padding: 5, width: 26, height: 26, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', color: 'white'}}>9</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View style={{position: 'relative', padding: 10}}>
              <ChatIcon width={28} fill={color} name="Chat" />
              <View style={{backgroundColor: 'red', borderRadius: 50, position: 'absolute', right: 0, padding: 5, width: 26, height: 26, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', color: 'white'}}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AccountIcon width={28} fill={color} name="Account" />
          ),
        }}
      />
    </Tabs>
  );
}
