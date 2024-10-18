import Review from '@/constants/temp/Review';
import * as SecureStore from 'expo-secure-store';

export const saveLoginStatus = async (isLoggedIn: boolean) => {
  try {
    await SecureStore.setItemAsync('isUserLogged', JSON.stringify(isLoggedIn));
  } catch (e) {
    throw new Error('Failed to save login status securely: ' + e);
  }
};

export const getLoginStatus = async () => {
  try {
    const value = await SecureStore.getItemAsync('isUserLogged');
    return value ? JSON.parse(value) : false;
  } catch (e) {
    throw new Error('Failed to retrieve login status securely: ' + e);
  }
};
