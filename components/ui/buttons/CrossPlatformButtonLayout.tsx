import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import { View, ViewStyle } from 'react-native';
import { Pressable, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface CrossPlatformButtonLayoutProps {
  children: React.ReactNode;
  onPress: () => void;
  containerTailwindCss?: string;
  styleContainer?: ViewStyle;
  removeAllStyles?: boolean;
  buttonTailwindCss?: string;
  disabled?: boolean;
}

const CrossPlatformButtonLayout: React.FC<CrossPlatformButtonLayoutProps> = ({
  children,
  onPress,
  removeAllStyles = false,
  containerTailwindCss = '',
  buttonTailwindCss = '',
  styleContainer,
  disabled = false,
}) => {
  const containerClasses = removeAllStyles
    ? containerTailwindCss
    : `border-2 border-grey-light p-2 my-1 rounded-xl items-center justify-center flex-row ${containerTailwindCss}`;
  const finalContainerClasses = `${containerClasses} ${disabled ? 'opacity-50' : ''}`.trim();

  // Base button styles for Android vs. other platforms
  const buttonBaseClasses = removeAllStyles
    ? ''
    : isAndroidPlatform()
    ? 'items-center justify-center flex-row min-w-full'
    : 'items-center justify-center flex-row flex-1';
  // Append disabled style if necessary
  const finalButtonClasses = `${buttonBaseClasses} ${buttonTailwindCss} ${disabled ? 'opacity-50' : ''}`.trim();

  return (
    <View style={styleContainer} className={finalContainerClasses}>
      {isAndroidPlatform() ? (
        <TouchableWithoutFeedback disabled={disabled} onPress={onPress} className={finalButtonClasses}>
          {children}
        </TouchableWithoutFeedback>
      ) : (
        <Pressable disabled={disabled} onPress={onPress} className={finalButtonClasses}>
          {children}
        </Pressable>
      )}
    </View>
  );
};

export default CrossPlatformButtonLayout;
