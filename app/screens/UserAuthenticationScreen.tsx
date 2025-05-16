import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import {StyleSheet, View} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from '@rneui/themed';
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import UserAuthenticationContent from '@/components/auth/UserAuthentificationContent';
import smallDevicebreakpointHeight from '@/constants/dimensions/smallDevicebreakpointHeight';
import {Dimensions} from 'react-native';
import AuthAction from '@/types/auth/Action';
import {useRoute} from '@react-navigation/native';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import isScreenSmall from '@/services/responsive/isScreenSmall';
const {height} = Dimensions.get('window');

export default function UserAuthenticationScreen() {
  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);
  const route = useRoute();
  //@ts-ignore
  const {register, isUser} = route.params as {
    register: boolean;
    isUser: boolean;
  };

  useEffect(() => {
    if (register) {
      setIsUserRegistering(true);
    }
  }, []);

  const action = useMemo<AuthAction>(() => {
    return isUserRegistering ? 'register' : 'login';
  }, [isUserRegistering]);

  return (
    <SafeAreaViewLayout tailwindCss="flex-1 bg-white pt-2">
      <View className="flex-1 justify-between">
        <View>
          <View style={{height: isScreenSmall() ? 40 : 60}}>
            <ToPreviousPage containerClassName="m-2 " />
          </View>
          <View className="justify-center items-center">
            <Image source={TicDriveLogo} style={styles.logoImage} />
          </View>
        </View>
        <ScrollView className="flex-1" automaticallyAdjustKeyboardInsets>
          <UserAuthenticationContent
            action={action}
            isUserRegistering={isUserRegistering}
            setIsUserRegistering={setIsUserRegistering}
            clientCategory={isUser ? 'user' : 'workshop'}
          />
        </ScrollView>
      </View>
    </SafeAreaViewLayout>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1.5,
    margin: 10,
    flex: 1,
  },
  continueWithText: {
    color: Colors.light.placeholderText,
  },
  link: {
    color: 'black',
  },
  footerText: {
    color: Colors.light.placeholderText,
  },
  logoImage: {
    width: isScreenSmall() ? 150 : 180,
    height: isScreenSmall() ? 150 : 180,
    resizeMode: 'contain',
  },
});
