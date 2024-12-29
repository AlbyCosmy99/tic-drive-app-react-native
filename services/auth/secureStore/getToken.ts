import * as SecureStore from 'expo-secure-store';

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (e) {
    throw new Error('Failed to get token: ' + e);
  }
};
