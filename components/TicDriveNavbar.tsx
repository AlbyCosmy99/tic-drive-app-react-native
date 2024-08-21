import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';

interface TicDriveNavbarProps {
  onPress: () => void;
}

const TicDriveNavbar: React.FC<TicDriveNavbarProps>  = ({ onPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.navbar}>
            <View style={styles.logo}>
                <Text style={[styles.title, styles.ticText]}>Tic</Text>
                <Text style={[styles.title, styles.driveText]}>Drive</Text>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.navButton}>
                <Icon name="menu" size={30} color="#737373" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>  
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    height: 60,
    backgroundColor: '#FFFFFF',
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
    color: '#737373'
  },
  driveText: {
    color: Colors.green.drive
  }
});

export default TicDriveNavbar;
