import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {useColorScheme} from '@/hooks/useColorScheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from '@/constants/Colors';
import GlobalProvider from './stateManagement/contexts/GlobalProvider';
import {Provider} from 'react-redux';
import store from './stateManagement/redux/store/store';
import { useAppSelector } from './stateManagement/redux/hooks';
import { getLoginStatus } from './utils';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userAuthStatus = await getLoginStatus();
        setIsUserLogged(userAuthStatus)
      } catch (error) {
        console.error('Error checking auth status: ', error);
      }
    };
    checkAuth();
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GlobalProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen 
                name="(hub)" 
                options={{
                  title: 'Hub',
                  headerShown: false,
                  animation: 'fade'
                }} 
              />
              <Stack.Screen
                name="screens/ChooseServicesScreen"
                options={{
                  title: 'ChooseServicesScreen',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/LandingScreen"
                options={{
                  title: 'ChooseServicesScreen',
                  headerShown: false,
                  animation: 'fade'
                }}
              />
              <Stack.Screen
                name="screens/UserAuthentification"
                options={{
                  title: 'UserAuthentification',
                  headerShown: false,
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="screens/RegisterVehicle"
                options={{
                  title: 'Register Vehicle',
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="(tabs)" 
                options={{
                  title: 'Tabs',
                  headerShown: false, 
                  animation: isUserLogged ? 'fade' : 'default'
                }} 
              />
              <Stack.Screen
                name="screens/WorkshopDetails"
                options={{
                  title: 'Workshop details',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/CalendarDateSelection"
                options={{
                  title: 'Calendar Date Selection',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/BookingConfirmation"
                options={{
                  title: 'Booking Confirmation',
                  headerShown: false,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </GestureHandlerRootView>
        </GlobalProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.light.background,
  },
});
