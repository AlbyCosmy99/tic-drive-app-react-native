import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { saveLoginStatus } from '@/app/utils';
import GlobalContext from '@/app/stateManagement/contexts/GlobalContext';

const TicDriveNavbar = () =>  {
  const colorScheme = useColorScheme()
  const {isUserLogged, setIsUserLogged} = useContext(GlobalContext)

  const backgroundStyle = {
    backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
  }

  const handleLogout = async () => {
    await saveLoginStatus(false)
    setIsUserLogged(false)
  }

  return (
    <SafeAreaView>
        <View className='flex-row items-center justify-between px-2.5 h-14' style={backgroundStyle}>
            <View className='flex-row'>
                <Text className='font-bold text-3xl' style={[styles.title, styles.ticText]}>Tic</Text>
                <Text className='font-bold text-3xl' style={[styles.title, styles.driveText]}>Drive</Text>
            </View>
            {isUserLogged ? (
              <TouchableOpacity onPress={handleLogout} className='p-2.5'>
                <View className='flex-row gap-1 items-center justify-center'>
                  <Entypo name="login" size={24} color={Colors.light.text} />
                  <Text className='text-xl' style={styles.login}>Logout</Text>
                </View>
              </TouchableOpacity>) : (
                <TouchableOpacity onPress={() => router.push('../screens/Login')} className='p-2.5'>
                  <View className='flex-row gap-1 items-center justify-center'>
                    <Entypo name="login" size={24} color={Colors.light.text} />
                    <Text className='text-xl' style={styles.login}>Login</Text>
                  </View>
                </TouchableOpacity>
              )
            }
        </View>
    </SafeAreaView>  
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
