import axiosClient from '@/services/http/axiosClient';
import {Params} from '@/types/config/Params';

const getFavoriteWorkshops = async (
  token: string,
  skip: number,
  take: number,
  debouncedFilter: string,
  params?: Params,
) => {
  return await axiosClient.get(
    `customer/workshops/favorite?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default getFavoriteWorkshops;
