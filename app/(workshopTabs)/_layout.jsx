import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WorkshopRequests from './Requests';
import WorkshopAccount from './Account';
import BookingsIcon from '@/components/svgs/BookingsIcon';
import RequestsIcon from '@/components/svgs/CarRepairService';
import ChatIcon from '@/components/svgs/ChatIcon';
import AccountIcon from '@/components/svgs/AccountIcon';
import WorkshopChat from './Chat';
import WorkshopBookings from './Bookings';
import {Colors} from '@/constants/Colors';

const Tab = createBottomTabNavigator();

export default function WorkshopTabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.green.drive,
      }}
    >
      <Tab.Screen
        name="Requests"
        component={WorkshopRequests}
        options={{
          title: 'Requests',
          headerShown: false,
          tabBarIcon: ({color}) => <RequestsIcon width={28} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={WorkshopBookings}
        options={{
          title: 'Bookings',
          headerShown: false,
          tabBarIcon: ({color}) => <BookingsIcon width={28} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={WorkshopChat}
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({color}) => <ChatIcon width={28} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={WorkshopAccount}
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({color}) => <AccountIcon width={28} fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
