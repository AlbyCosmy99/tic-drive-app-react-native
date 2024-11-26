import { Image } from '@rneui/themed';
import { ImageStyle, StyleProp } from 'react-native';

interface CircularUserAvatarProps {
  uri: string;
  styles?: StyleProp<ImageStyle>;
}

const CircularUserAvatar: React.FC<CircularUserAvatarProps> = ({ uri, styles }) => {
  return (
    <Image
      source={{ uri }}
      style={[
        {
            width: 45,
            height: 45,
            borderRadius: 50,
        },
        styles,
      ]}
    />
  );
};

export default CircularUserAvatar;
