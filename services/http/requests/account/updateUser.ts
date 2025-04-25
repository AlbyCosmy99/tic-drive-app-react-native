import User from '@/types/User';
import axiosClient from '../../axiosClient';

const updateUser = async (newUser: User, token: string) => {
  return await axiosClient.put(
    'auth/update-user',
    {
      name: newUser.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default updateUser;
