import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WorkshopRequests from './Requests';
import WorkshopAccount from './Account';
import BookingsIcon from '../../assets/svg/bookingsIcon.svg';
import ChatIcon from '../../assets/svg/chatIcon.svg';
import AccountIcon from '../../assets/svg/accountIcon.svg';
import WorkshopChat from './Chat';

const Tab = createBottomTabNavigator();

export default function WorkshopTabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
      <Tab.Screen
        name="Requests"
        component={WorkshopRequests}
        options={{
          title: 'Requests',
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
