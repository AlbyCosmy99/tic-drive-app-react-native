import * as SecureStore from 'expo-secure-store';

export const setSecureToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('token', token);
  } catch (e) {
    throw new Error('Failed to set token: ' + e);
  }
};

export const removeSecureToken = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
  } catch (e) {
    throw new Error('Failed to remove token: ' + e);
  }
};
