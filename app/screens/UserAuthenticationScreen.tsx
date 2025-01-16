import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from '@rneui/themed';
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import UserAuthenticationContent from '@/components/auth/UserAuthentificationContent';
import smallDevicebreakpointHeight from '@/constants/smallDevicebreakpointHeight';

import {Dimensions} from 'react-native';
import AuthAction from '@/types/auth/Action';
import isIOSPlatform from '@/utils/devices/IsIOSPlatform';
import {useRoute} from '@react-navigation/native';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
const {width, height} = Dimensions.get('window');

export default function UserAuthenticationScreen() {
  const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false);
  const route = useRoute();
  //@ts-ignore
  const {register, isUser} = route.params;

  useEffect(() => {
    if (register) {
      setIsUserRegistering(true);
    }
  }, []);

  const action = useMemo<AuthAction>(() => {
    return isUserRegistering ? 'register' : 'login';
  }, [isUserRegistering]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={isIOSPlatform() ? 'padding' : 'height'}
    >
      <SafeAreaViewLayout tailwindCss="bg-white">
        <View className="flex-1 justify-between">
          <View>
            <View style={{height: 60}}>
              <ToPreviousPage containerClassName="m-2 mb-7" />
            </View>
            <View className="justify-center items-center">
              <Image source={TicDriveLogo} style={styles.logoImage} />
            </View>
          </View>
          <ScrollView className="flex-1">
            <UserAuthenticationContent
              action={action}
              isUserRegistering={isUserRegistering}
              setIsUserRegistering={setIsUserRegistering}
              clientCategory={isUser ? 'user' : 'workshop'}
            />
          </ScrollView>
        </View>
      </SafeAreaViewLayout>
    </KeyboardAvoidingView>
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
    width: height > smallDevicebreakpointHeight ? 180 : 150,
    height: height > smallDevicebreakpointHeight ? 180 : 150,
    resizeMode: 'contain',
  },
});
