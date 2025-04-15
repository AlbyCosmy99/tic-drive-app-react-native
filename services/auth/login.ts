import User from '@/types/User';
import axiosClient from '../http/axiosClient';

export const login = async (user: User): Promise<any> => {
  try {
    const response = await axiosClient.post('auth/login', {
      email: user.email,
      password: user.password,
      userType:
        user.category === 'user' ? 1 : user.category === 'workshop' ? 2 : 0,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
