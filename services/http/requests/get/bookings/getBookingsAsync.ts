import axiosClient from '@/services/http/axiosClient';

const getBookingsAsync = async (token: string) => {
  return await axiosClient.get('bookings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getBookingsAsync
