import {useEffect, useState} from 'react';
import axiosClient from '@/services/http/axiosClient';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import Workshop from '@/types/workshops/Workshop';
import useGlobalErrors from '../../errors/useGlobalErrors';
import {Params} from '@/types/config/Params';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';

export default function useNearbyWorkshops(
  skip: number = 0,
  take: number = 10,
  params?: Params,
) {
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);
  const serviceChoosen = useServiceChoosenByCustomer();

  const [count, setCount] = useState(0);
  const [nearbyWorkshops, setNearbyWorkshops] = useState<Workshop[]>([]);
  const [loadingNearbyWorkshops, setLoadingNearbyWorkshops] = useState(false);
  const {setErrorMessage} = useGlobalErrors();

  const [debouncedFilter, setDebouncedFilter] = useState<string>(
    params?.filter ?? '',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(params?.filter ?? '');
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [params?.filter]);

  useEffect(() => {
    setLoadingNearbyWorkshops(true);
  }, [params?.order, debouncedFilter]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      if (!user?.coordinates) {
        return;
      }

      try {
        setLoadingNearbyWorkshops(true);
        const response = await axiosClient.get(
          `/workshops/nearby?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}${serviceChoosen?.id && `&serviceId=${serviceChoosen?.id}`}`,
          {
            headers: {Authorization: `Bearer ${token}`},
            params: {
              latitude: user.coordinates.latitude,
              longitude: user.coordinates.longitude,
            },
          },
        );

        setNearbyWorkshops(response.data?.nearbyWorkshops ?? []);
        setCount(response.data.count);
      } catch (err) {
        setErrorMessage('Failed to load nearby workshops');
      } finally {
        setLoadingNearbyWorkshops(false);
      }
    };

    if (loadingNearbyWorkshops) {
      fetchWorkshops();
    }
  }, [
    token,
    loadingNearbyWorkshops,
    params?.order,
    debouncedFilter,
    skip,
    take,
    user,
  ]);

  return {
    workshops: nearbyWorkshops,
    loadingWorkshops: loadingNearbyWorkshops,
    setLoadingWorkshops: setLoadingNearbyWorkshops,
    count,
  };
}
