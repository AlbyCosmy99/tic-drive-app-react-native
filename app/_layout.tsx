import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useState} from 'react';
import 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import getAnimation from '@/utils/route/getAnimation';
import GlobalProvider from '@/stateManagement/contexts/global/GlobalProvider';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import store from '@/stateManagement/redux/store/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Hub from './(hub)/_layout';
import ChooseServicesScreen from './screens/ChooseServicesScreen';
import UserAuthenticationScreen from './screens/UserAuthenticationScreen';
import RegisterVehicleScreen from './screens/user/RegisterVehicleScreen';
import WorkshopTabLayout from './(workshopTabs)/_layout';
import userTabLayout from './(userTabs)//_layout';
import WorkshopDetails from './screens/user/WorkshopDetails';
import BookingConfirmationScreen from './screens/user/BookingConfirmationScreen';
import NotFoundScreen from './+not-found';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import Navigation from '@/types/nav/Navigation';
import ReviewBookingDetailsScreen from './screens/user/ReviewBookingDetailsScreen';
import UserAccountDetailsScreen from './screens/user/UserAccountDetailsScreen';
import AddNewPaymentMethodScreen from './screens/payment/AddNewPaymentMethodScreen';
import PaymentCardsScreen from './screens/payment/PaymentCardsScreen';
import ConfirmEmailScreen from './screens/auth/ConfirmEmailScreen';
import CarProvider from '@/stateManagement/contexts/car/CarProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WorkshopsListScreen from './screens/workshop/WorkshopsListScreen';
import WorkshopReviewsListScreen from './screens/workshop/reviews/WorkshopReviewsListScreen';
import ChatScreen from './screens/chat/ChatScreen';
import '@/i18n';
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  //AuthContext data
  const [loginRouteName, setLoginRouteName] = useState('');
  const [loginRouteParams, setLoginRouteParams] = useState<any>({});

  const [navigation, setNavigation] = useState<Navigation>(null);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlaywriteGBS: require('../assets/fonts/PlaywriteGBS-VariableFont_wght.ttf'),
    RegularLato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    BoldLato: require('../assets/fonts/Lato/Lato-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider value={DefaultTheme}>
          <GlobalProvider>
            <CarProvider>
              <NavigationContext.Provider value={{navigation, setNavigation}}>
                <AuthContext.Provider
                  value={{
                    loginRouteName,
                    setLoginRouteName,
                    loginRouteParams,
                    setLoginRouteParams,
                  }}
                >
                  <GestureHandlerRootView>
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Hub"
                        component={Hub}
                        options={({route}) => ({
                          title: 'Hub',
                          headerShown: false,
                          animation: 'fade',
                        })}
                      />
                      <Stack.Screen
                        name="UserAuthenticationScreen"
                        component={UserAuthenticationScreen}
                        options={({route}) => ({
                          title: 'UserAuthenticationScreen',
                          headerShown: false,
                          presentation: 'modal',
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        component={ChooseServicesScreen}
                        name="ChooseServicesScreen"
                        options={({route}) => ({
                          title: 'ChooseServicesScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="RegisterVehicleScreen"
                        component={RegisterVehicleScreen}
                        options={({route}) => ({
                          title: 'RegisterVehicleScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="WorkshopsListScreen"
                        component={WorkshopsListScreen}
                        options={({route}) => ({
                          title: 'WorkshopsListScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="workshopTabs"
                        component={WorkshopTabLayout}
                        options={({route}) => ({
                          title: 'workshopTabs',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="userTabs"
                        component={userTabLayout}
                        options={({route}) => ({
                          title: 'userTabs',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="WorkshopDetails"
                        component={WorkshopDetails}
                        options={({route}) => ({
                          title: 'WorkshopDetails',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="ReviewBookingDetailsScreen"
                        component={ReviewBookingDetailsScreen}
                        options={({route}) => ({
                          title: 'ReviewBookingDetailsScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="WorkshopReviewsListScreen"
                        component={WorkshopReviewsListScreen}
                        options={({route}) => ({
                          title: 'WorkshopReviewsListScreen',
                          headerShown: false,
                          presentation: 'modal',
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="BookingConfirmationScreen"
                        component={BookingConfirmationScreen}
                        options={({route}) => ({
                          title: 'BookingConfirmationScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="UserAccountDetailsScreen"
                        component={UserAccountDetailsScreen}
                        options={({route}) => ({
                          title: 'UserAccountDetailsScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="PaymentCardsScreen"
                        component={PaymentCardsScreen}
                        options={({route}) => ({
                          title: 'PaymentCardsScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="AddNewPaymentMethodScreen"
                        component={AddNewPaymentMethodScreen}
                        options={({route}) => ({
                          title: 'AddNewPaymentMethodScreen',
                          headerShown: false,
                          presentation: 'modal',
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="ConfirmEmailScreen"
                        component={ConfirmEmailScreen}
                        options={({route}) => ({
                          title: 'ConfirmEmailScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="ChatScreen"
                        component={ChatScreen}
                        options={({route}) => ({
                          title: 'ChatScreen',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                      <Stack.Screen
                        name="notFound"
                        component={NotFoundScreen}
                        options={({route}) => ({
                          title: 'userTabs',
                          headerShown: false,
                          animation: getAnimation(route),
                        })}
                      />
                    </Stack.Navigator>
                  </GestureHandlerRootView>
                </AuthContext.Provider>
              </NavigationContext.Provider>
            </CarProvider>
          </GlobalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
