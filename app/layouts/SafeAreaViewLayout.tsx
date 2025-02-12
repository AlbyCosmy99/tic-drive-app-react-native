import {globalStyles} from '@/styles/globalStyles';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import React, {ReactNode} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaViewLayoutProps {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>[];
  tailwindCss?: string;
}

const SafeAreaViewLayout: React.FC<SafeAreaViewLayoutProps> = ({
  children,
  styles = [],
  tailwindCss = '',
}) => {
  return (
    <SafeAreaProvider
      style={[...styles, globalStyles().safeAreaView]}
      className={`flex-1 ${tailwindCss} ${necessaryDeviceBottomInset()}`}
    >
      {children}
    </SafeAreaProvider>
  );
};

export default SafeAreaViewLayout;
