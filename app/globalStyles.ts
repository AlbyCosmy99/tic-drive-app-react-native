import {StatusBar, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const globalStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    safeAreaView: {
      paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
    },
  });
};
