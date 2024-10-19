import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../stateManagement/redux/hooks';
import {login, logout} from '../stateManagement/redux/slices/authSlice';
import {getLoginStatus} from '../utils';
import {useEffect} from 'react';
import UserLogged from '@/mock/UserLogged';
import LottieView from 'lottie-react-native';

const Hub = () => {
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const user = useAppSelector(state => state.auth.user)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userAuthStatus = await getLoginStatus();
        if (userAuthStatus) {
          dispatch(login(user ?? UserLogged));
          router.replace('../(tabs)/user/Home');
        } else {
          dispatch(logout());
          router.replace('../screens/LandingScreen');
        }
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
