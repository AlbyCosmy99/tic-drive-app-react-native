import {StyleSheet, Platform} from 'react-native';

export const globalStyles = () => {
  return StyleSheet.create({
    safeAreaView: {
      ...(Platform.OS !== 'ios' && {backgroundColor: 'white'}),
    },
  });
};
