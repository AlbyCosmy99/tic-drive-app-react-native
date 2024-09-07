import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';

const TicDriveNavbar = () => {
  const colorScheme = useColorScheme()

  const backgroundStyle = {
    backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
  }

  return (
    <SafeAreaView>
        <View className='flex-row items-center justify-between px-2.5 h-14' style={backgroundStyle}>
            <View className='flex-row'>
                <Text className='font-bold text-3xl' style={[styles.title, styles.ticText]}>Tic</Text>
                <Text className='font-bold text-3xl' style={[styles.title, styles.driveText]}>Drive</Text>
            </View>
            <TouchableOpacity onPress={() => alert(colorScheme)} className='p-2.5'>
                <Icon name="menu" size={30} color={colorScheme === 'light' ? '#737373' : Colors.dark.text} />
            </TouchableOpacity>
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
  }
});

export default TicDriveNavbar;
