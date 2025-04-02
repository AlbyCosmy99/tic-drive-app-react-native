import {Linking} from 'react-native';

const openGoogleMaps = (
  address?: string,
  latitude?: number,
  longitude?: number,
) => {
  if (address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url);
  } else {
    // Fallback to using coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }
};

export default openGoogleMaps;
