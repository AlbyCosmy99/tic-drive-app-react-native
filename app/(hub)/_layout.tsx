import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../stateManagement/redux/hooks';
import {login, logout} from '../stateManagement/redux/slices/authSlice';
import {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {getUser} from '../services/auth/secureStore/user';

const Hub = () => {
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();

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
