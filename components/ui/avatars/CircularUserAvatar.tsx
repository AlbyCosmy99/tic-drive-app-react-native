import React from 'react';
import { Image, ImageStyle } from 'react-native';
import defaultAvatar from '@/assets/images/default-avatar.png'; // or relative path

interface Props {
  uri?: string;
  styles?: ImageStyle;
}

export default function CircularUserAvatar({ uri, styles }: Props) {
  const imageSource = uri ? { uri } : defaultAvatar;

  return (
    <Image
      source={imageSource}
      style={[{ width: 70, height: 70, borderRadius: 35 }, styles]}
      resizeMode="cover"
    />
  );
}
