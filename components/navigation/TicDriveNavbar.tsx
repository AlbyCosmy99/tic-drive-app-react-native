import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/app/stateManagement/redux/hooks';
import ToPreviousPage from './ToPreviousPage';
import TicDriveAuthButton from '../ui/buttons/TicDriveAuthButton';
interface TicDriveNavbarProps {
  isLoginAvailable?: boolean;
}

const TicDriveNavbar: React.FC<TicDriveNavbarProps> = ({
  isLoginAvailable = true
}) =>  {
  const colorScheme = useColorScheme()
  const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)

  const navigation = useNavigation()

  const backgroundStyle = {
    backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
  }

  return (
    <View 
      className={`flex-row items-center ${!isLoginAvailable ? 'justify-center' : 'justify-between'} px-2.5 h-14`} 
      style={backgroundStyle}
    >
      <View className='flex-1 justify-start flex-row'>
        {navigation.canGoBack() && <ToPreviousPage />}
      </View>
      <View className='flex-row flex-1 justify-center'>
          <Text className='font-bold text-3xl' style={[styles.title, styles.ticText]}>Tic</Text>
          <Text className='font-bold text-3xl' style={[styles.title, styles.driveText]}>Drive</Text>
      </View>
      <View className='flex-1 justify-end flex-row'>
        {isLoginAvailable && (isUserLogged ? (
            <TicDriveAuthButton 
              action='logout'  
            />
          ) : (
            <TicDriveAuthButton 
              onPress={() => {
                router.push('/screens/UserAuthentification')
                
              }}
              action='login'
            />
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
