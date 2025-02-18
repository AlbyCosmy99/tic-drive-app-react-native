import {globalStyles} from '@/styles/globalStyles';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import React, {ReactNode} from 'react';
import {StyleProp, View} from 'react-native';
import {ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface SafeAreaViewLayoutProps {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>[];
  tailwindCss?: string;
  disabled?: boolean;
}

const SafeAreaViewLayout: React.FC<SafeAreaViewLayoutProps> = ({
  children,
  styles = [],
  tailwindCss = '',
  disabled = false,
}) => {
  return disabled ? (
    <View
      className={`flex-1 bg-white ${tailwindCss} ${necessaryDeviceBottomInset()}`}
      style={[{}, ...styles, globalStyles().safeAreaView]}
    >
      {children}
    </View>
  ) : (
    <SafeAreaView
      className={`flex-1 bg-white ${tailwindCss} ${necessaryDeviceBottomInset()}`}
      style={[{}, ...styles, globalStyles().safeAreaView]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewLayout;
