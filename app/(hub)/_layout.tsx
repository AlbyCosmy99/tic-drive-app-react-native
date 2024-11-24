import {View} from 'react-native';
import {useContext, useEffect} from 'react';
import {getUser} from '@/services/auth/secureStore/user';
import {login, logout} from '@/stateManagement/redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import * as SplashScreen from 'expo-splash-screen';
import {useNavigation} from '@react-navigation/native';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationReset from '@/services/navigation/reset';

const Hub = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {setNavigation} = useContext(NavigationContext);

  let user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    setNavigation(navigation);
    const checkAuth = async () => {
      try {
        if (!user) {
          user = await getUser();
          dispatch(login(user));
        }
        if (user) {
          navigationReset(
            navigation,
            0,
            user?.category === 'workshop' ? 'workshopTabs' : 'userTabs',
            {animation: 'fade'},
            user?.category === 'workshop' ? 'Requests' : 'Home',
          );
        } else {
          dispatch(logout());
          navigationReset(navigation, 0, 'LandingScreen', {animation: 'fade'});
        }
        SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error checking auth status: ', error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  return (
    <View className="justify-center items-center w-full h-full bg-white">
    {/* Intentionally left blank */}
    </View>
  );
};

export default Hub;
