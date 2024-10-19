import * as SecureStore from 'expo-secure-store';
import User from './types/User';

export const saveUser = async (user: User | null) => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user))
  } catch(e) {
    throw new Error("Failed to save user securely: " + e)
  }
}

export const getUser = async () => {
  try {
    const value = await SecureStore.getItemAsync('user')
    return value ? JSON.parse(value) : null
  } catch(e) {
    throw new Error("Failed to retrieve user securely: " + e)
  }
}