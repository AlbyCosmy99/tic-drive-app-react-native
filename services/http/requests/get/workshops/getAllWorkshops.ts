import axiosClient from '@/services/http/axiosClient';
import {Params} from '@/types/config/Params';

const getAllWorkshops = async (
  token: string,
  skip: number,
  take: number,
  debouncedFilter: string,
  serviceId: number = 0,
  params?: Params,
) => {
  return await axiosClient.get(
    `workshops?skip=${skip}&take=${take}&serviceId=${serviceId}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default getAllWorkshops;
