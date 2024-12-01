import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    className={`${containerTailwindCss}`}
    style={[styles.cardOptionContainer, style]}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  >
    {icon}
    <Text className={`font-medium ${textTailwindCss}`}>{text}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardOptionContainer: {
    borderColor: Colors.light.green.drive,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
});

export default TicDriveOptionButton;
