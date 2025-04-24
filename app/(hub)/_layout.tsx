import {ActivityIndicator, View} from 'react-native';
import {useContext, useEffect} from 'react';
import {login, setToken} from '@/stateManagement/redux/slices/authSlice';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import * as SplashScreen from 'expo-splash-screen';
import {useNavigation} from '@react-navigation/native';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationReset from '@/services/navigation/reset';
import {getToken} from '@/services/auth/secureStore/getToken';
import {getPayload} from '@/services/auth/getPayload';
import {removeSecureToken} from '@/services/auth/secureStore/setToken';
import navigationPush from '@/services/navigation/push';
import {Colors} from '@/constants/Colors';
import getUserData from '@/utils/auth/getUserData';
import i18n from '@/i18n';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';

const Hub = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {setNavigation} = useContext(NavigationContext);

  let user = useAppSelector(state => state.auth.user);
  const languageCode = useAppSelector(state => state.language.languageCode);

  useEffect(() => {
    setNavigation(navigation);
    const checkAuth = async () => {
      try {
        const token = await getToken();
        //@ts-ignore
        if (token) {
          dispatch(setToken(token));
          try {
            const payload = await getPayload(token);
            dispatch(login(getUserData(payload)));
            if (payload.emailConfirmed) {
              navigationReset(
                navigation,
                0,
                user?.category === 'workshop' ? 'workshopTabs' : 'userTabs',
                {animation: 'fade'},
                user?.category === 'workshop' ? 'Requests' : 'Home',
              );
            } else {
              navigationReset(navigation, 0, 'ConfirmEmailScreen', {
                animation: 'fade',
              });
            }
          } catch (err) {
            //if here, probably token is in secureStore but user is not registered in db - to solve, we make the user remove token from secureStore and retry
            console.error('error while getting user data.');
            await removeSecureToken();
            navigationPush(navigation, '/');
          }
        } else {
          navigationReset(navigation, 0, 'userTabs', {animation: 'fade'});
        }
        SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error checking auth status: ', error);
      }
    };
    checkAuth();

    i18n.changeLanguage(languageCode);
  }, []);

  useEffect(() => {
    setNavigation(navigation);
  }, [navigation]);

  return (
    <View className="justify-center items-center w-full h-full bg-white">
      <TicDriveSpinner />
    </View>
  );
};

export default Hub;
