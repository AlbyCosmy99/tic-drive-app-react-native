import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';

const TicDriveNavbar = () => {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaView>
        <View style={[styles.navbar]}>
            <View style={styles.logo}>
                <Text style={[styles.title, styles.ticText]}>Tic</Text>
                <Text style={[styles.title, styles.driveText]}>Drive</Text>
            </View>
            <TouchableOpacity onPress={() => alert(colorScheme)} style={styles.navButton}>
                <Icon name="menu" size={30} color={colorScheme === 'light' ? '#737373' : Colors.light.ticText} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>  
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Colors.light.background,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logo: {
    flexDirection: 'row',
  },
  ticText: {
    color: Colors.light.ticText
  },
  driveText: {
    color: Colors.light.green.drive
  }
});

export default TicDriveNavbar;
