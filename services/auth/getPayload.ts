import axiosClient from '../http/axiosClient';

export const getPayload = async (token: string): Promise<any> => {
  try {
    const response = await axiosClient.get('auth/get-payload', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
