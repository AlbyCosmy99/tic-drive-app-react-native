import {Colors} from '@/constants/Colors';
import {Button} from '@rneui/themed';
import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CrossPlatformButtonLayout from './CrossPlatformButtonLayout';

interface OAuth2ButtonProps {
  text: string;
  icon: ReactNode;
  onPress: () => void;
}

const OAuth2Button: React.FC<OAuth2ButtonProps> = ({text, icon, onPress}) => {
  return (
    <View className="flex-1 m-1 mx-2">
      <CrossPlatformButtonLayout
        styleContainer={styles.button}
        onPress={onPress}
      >
        <View className="flex-row items-center justify-center gap-1 py-1 px-2">
          {icon}
          <Text allowFontScaling={false} className="text-lg text-black">
            {text}
          </Text>
        </View>
      </CrossPlatformButtonLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.light.OAuth2BorderButton,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default OAuth2Button;
