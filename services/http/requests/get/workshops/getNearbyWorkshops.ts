import axiosClient from '@/services/http/axiosClient';
import {Params} from '@/types/config/Params';
import User from '@/types/User';

const getNearbyWorkshops = async (
  token: string,
  skip: number,
  take: number,
  debouncedFilter: string,
  user?: User,
  serviceId?: number,
  params?: Params,
) => {
  return await axiosClient.get(
    `/workshops/nearby?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}${serviceId && `&serviceId=${serviceId}`}`,
    {
      headers: {Authorization: `Bearer ${token}`},
      params: {
        latitude: user?.coordinates?.latitude,
        longitude: user?.coordinates?.longitude,
      },
    },
  );
};
export default getNearbyWorkshops;
