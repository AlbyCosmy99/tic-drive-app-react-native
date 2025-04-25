import axiosClient from '../../axiosClient';

const getUserData = async (token: string): Promise<any> => {
  const response = await axiosClient.get('auth/get-user-data', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

export default getUserData;
