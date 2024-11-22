import {router} from 'expo-router';
import { Text, View} from 'react-native';
import {useEffect} from 'react';
import { getUser } from '@/services/auth/secureStore/user';
import { login, logout } from '@/stateManagement/redux/slices/authSlice';
import { useAppDispatch } from '@/stateManagement/redux/hooks';
import * as SplashScreen from 'expo-splash-screen';

const Hub = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser();
        if (user) {
          if (user && !user?.name) {
            user.name = 'Andrei';
          }
          dispatch(login(user));
          router.replace(
            user?.category === 'workshop'
              ? '../(workshopTabs)/Requests?animation=fade'
              : '../(userTabs)/Home?animation=fade',
          );
        } else {
          dispatch(logout());
          router.replace('../screens/LandingScreen?animation=fade');
        }
        SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error checking auth status: ', error);
      }
    };
    checkAuth();
  }, []);

  return (
    <View className="justify-center items-center w-full h-full bg-white">
      <Text>ciao test</Text>
    </View>
  );
};

export default Hub;
