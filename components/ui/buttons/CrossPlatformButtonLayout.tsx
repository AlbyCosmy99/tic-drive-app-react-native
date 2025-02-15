import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import {View, ViewStyle} from 'react-native';
import {
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

interface CrossPlatformButtonLayoutProps {
  children: React.ReactNode;
  onPress: () => void;
  containerTailwindCss?: string;
  styleContainer?: ViewStyle;
  removeAllStyles?: boolean;
}

const CrossPlatformButtonLayout: React.FC<CrossPlatformButtonLayoutProps> = ({
  children,
  onPress,
  removeAllStyles = false,
  containerTailwindCss = '',
  styleContainer,
}) => {
  return (
    <View
      style={styleContainer}
      className={`${removeAllStyles ? `${containerTailwindCss}` : `border-2 border-grey-light p-2 my-1 rounded-xl items-center justify-center flex-row ${containerTailwindCss}`}`}
    >
      {isAndroidPlatform() ? (
        <TouchableWithoutFeedback
          onPress={onPress}
          className={`${removeAllStyles ? '' : 'items-center justify-center flex-row min-w-full'}`}
        >
          {children}
        </TouchableWithoutFeedback>
      ) : (
        <Pressable
          onPress={onPress}
          className={`${removeAllStyles ? '' : 'items-center justify-center flex-row flex-1'}`}
        >
          {children}
        </Pressable>
      )}
    </View>
  );
};

export default CrossPlatformButtonLayout;
