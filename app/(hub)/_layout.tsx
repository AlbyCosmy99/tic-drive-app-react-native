import {router, useLocalSearchParams, usePathname} from 'expo-router';
import { StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import { getUser } from '@/services/auth/secureStore/user';
import { login, logout } from '@/stateManagement/redux/slices/authSlice';
import { useAppDispatch } from '@/stateManagement/redux/hooks';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';

const Hub = () => {
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  useEffect(() => {
    console.log('here')
    const checkAuth = async () => {
      try {
        const user = await getUser();
        if (user) {
          if (user && !user?.name) {
            user.name = 'Andrei';
          }
          dispatch(login(user));
          router.push(
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
      {params && params.isCarGreen === 'false' ? (
        <LottieView
          source={require('@/assets/json/animations/TicDriveLoadingGrey.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      ) : (
        <LottieView
          source={require('@/assets/json/animations/TicDriveLoading.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lottieAnimation: {
    width: '100%',
    alignSelf: 'flex-end',
    height: 300,
  },
});

export default Hub;


