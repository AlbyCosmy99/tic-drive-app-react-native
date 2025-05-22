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
  const query = `workshops?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}${
    serviceId > 0 ? `&serviceId=${serviceId}` : ''
  }`;

  return await axiosClient.get(query, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getAllWorkshops;
