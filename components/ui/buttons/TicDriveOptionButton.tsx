import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@/constants/Colors';
import React, {ReactNode} from 'react';

interface TicDriveOptionButtonProps {
  text: string;
  icon: ReactNode;
  containerTailwindCss?: string;
  textTailwindCss?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const TicDriveOptionButton: React.FC<TicDriveOptionButtonProps> = ({
  text,
  icon,
  containerTailwindCss = '',
  textTailwindCss = '',
  onPress = () => {},
  accessibilityLabel = 'Option button',
  style = {},
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row items-center justify-center ${containerTailwindCss}`}
      style={[styles.cardOptionContainer, style]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      <View>{icon}</View>
      <Text className={`font-medium ${textTailwindCss}`}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardOptionContainer: {
    borderColor: Colors.light.green.drive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
});

export default TicDriveOptionButton;
