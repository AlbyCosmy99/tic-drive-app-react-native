import * as SecureStore from 'expo-secure-store';

export const setToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('token', token);
  } catch (e) {
    throw new Error('Failed to set token: ' + e);
  }
};
