import {globalStyles} from '@/styles/globalStyles';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import React, {ReactNode} from 'react';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 ${tailwindCss} ${necessaryDeviceBottomInset()}`}
      style={[{marginTop: insets.top}, ...styles, globalStyles().safeAreaView]}
    >
      {children}
    </View>
  );
};

export default SafeAreaViewLayout;
