import * as Location from 'expo-location';

const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const [address] = await Location.reverseGeocodeAsync({latitude, longitude});

    if (address) {
      return `${address.city}, ${address.postalCode}, ${address.country}`;
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Error retrieving address';
  }
};

export default getAddressFromCoords;
