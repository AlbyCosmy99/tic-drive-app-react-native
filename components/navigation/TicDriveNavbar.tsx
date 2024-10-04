import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { saveLoginStatus } from '@/app/utils';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/app/stateManagement/redux/hooks';
import { logout } from '@/app/stateManagement/redux/slices/authSlice';
import ToPreviousPage from './ToPreviousPage';
interface TicDriveNavbarProps {
  isLoginAvailable?: boolean;
}

const TicDriveNavbar = ({isLoginAvailable = true}: TicDriveNavbarProps) =>  {
  const colorScheme = useColorScheme()
  const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)

  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const backgroundStyle = {
    backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
  }

  const handleLogout = async () => {
    dispatch(logout())
    await saveLoginStatus(false)
    //sostituire con redux thunk?
  }

  return (
    <View 
      className={`flex-row items-center ${!isLoginAvailable ? 'justify-center' : 'justify-between'} px-2.5 h-14`} 
      style={backgroundStyle}
    >
      <View className='flex-1 justify-start flex-row'>
        <ToPreviousPage />
      </View>
      <View className='flex-row flex-1 justify-center'>
          <Text className='font-bold text-3xl' style={[styles.title, styles.ticText]}>Tic</Text>
          <Text className='font-bold text-3xl' style={[styles.title, styles.driveText]}>Drive</Text>
      </View>
      <View className='flex-1 justify-end flex-row'>
        {isLoginAvailable && (isUserLogged ? (
            <TouchableOpacity onPress={handleLogout} className='p-2.5'>
              <View className='flex-row gap-1 items-center justify-center'>
                <Entypo name="login" size={24} color={Colors.light.text} />
                <Text className='text-xl' style={styles.login}>Logout</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              if(navigation.canGoBack()) {
                navigation.dispatch(StackActions.popToTop());
              }
              router.push('../screens/UserAuthentification')
            }} className='p-2.5 pl-0 flex-row gap-2'>
              <View className='flex-row gap-1 items-center justify-center'>
                <Entypo name="login" size={24} color={Colors.light.text} />
                <Text className='text-xl' style={styles.login}>Login</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
  },
  ticText: {
    color: Colors.light.ticText
  },
  driveText: {
    color: Colors.light.green.drive
  },
  login: {
    color: Colors.light.text,  
  },
});


export default TicDriveNavbar;
