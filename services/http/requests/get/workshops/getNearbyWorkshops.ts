import axiosClient from '@/services/http/axiosClient';
import {Params} from '@/types/config/Params';
import {LatLng} from 'react-native-maps';

const getNearbyWorkshops = async (
  token: string,
  skip: number,
  take: number,
  debouncedFilter: string,
  coordinates?: LatLng,
  serviceId?: number,
  params?: Params,
) => {
  return await axiosClient.get(
    `/workshops/nearby?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}${serviceId && `&serviceId=${serviceId}`}`,
    {
      headers: {Authorization: `Bearer ${token}`},
      params: {
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      },
    },
  );
};
export default getNearbyWorkshops;
