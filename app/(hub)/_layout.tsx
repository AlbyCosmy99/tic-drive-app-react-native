import {View} from 'react-native';
import {useContext, useEffect} from 'react';
import {getUser} from '@/services/auth/secureStore/user';
import {login} from '@/stateManagement/redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import * as SplashScreen from 'expo-splash-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationReset from '@/services/navigation/reset';

const Hub = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {setNavigation} = useContext(NavigationContext);
  const route = useRoute();
  //@ts-ignore

  let user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    setNavigation(navigation);
    const checkAuth = async () => {
      try {
        //@ts-ignore
        if (!user && !route?.params?.isloggingOut) {
          user = await getUser();
          console.log('user: ', user);
          if (user) {
            dispatch(login(user));
          }
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
          navigationReset(navigation, 0, 'userTabs', {animation: 'fade'});
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
