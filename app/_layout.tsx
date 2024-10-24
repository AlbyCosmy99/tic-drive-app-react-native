import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalProvider from './stateManagement/contexts/GlobalProvider';
import { Provider } from 'react-redux';
import store from './stateManagement/redux/store/store';
import AuthContext from './stateManagement/contexts/AuthContext';
import getAnimation from './utils/route/getAnimation';
import { getUser } from './services/auth/secureStore/user';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlaywriteGBS: require('../assets/fonts/PlaywriteGBS-VariableFont_wght.ttf'),
    RegularLato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    BoldLato: require('../assets/fonts/Lato/Lato-Bold.ttf'),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser();
        if (user && !user?.name) {
          user.name = 'Andrei';
        }
        user ? setIsUserLogged(true) : setIsUserLogged(false);
      } catch (error) {
        console.error('Error checking auth status: ', error);
      }
    };
    checkAuth();
  }, [isUserLogged]);

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
          <AuthContext.Provider value={{ isUserLogged, setIsUserLogged }}>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen
                  name="(hub)"
                  options={({ route }) => ({
                    title: 'Hub',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/ChooseServicesScreen"
                  options={({ route }) => ({
                    title: 'ChooseServicesScreen',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/LandingScreen"
                  options={({ route }) => ({
                    title: 'LandingScreen',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/UserAuthentification"
                  options={({ route }) => ({
                    title: 'UserAuthentification',
                    headerShown: false,
                    presentation: 'modal',
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/RegisterVehicle"
                  options={({ route }) => ({
                    title: 'RegisterVehicle',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="(workshopTabs)"
                  options={({ route }) => ({
                    title: 'workshopTabs',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="(userTabs)"
                  options={({ route }) => ({
                    title: 'userTabs',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/WorkshopDetails"
                  options={({ route }) => ({
                    title: 'WorkshopDetails',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/CalendarDateSelection"
                  options={({ route }) => ({
                    title: 'CalendarDateSelection',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen
                  name="screens/BookingConfirmation"
                  options={({ route }) => ({
                    title: 'BookingConfirmation',
                    headerShown: false,
                    animation: getAnimation(route),
                  })}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </GestureHandlerRootView>
          </AuthContext.Provider>
        </GlobalProvider>
      </ThemeProvider>
    </Provider>
  );
}
