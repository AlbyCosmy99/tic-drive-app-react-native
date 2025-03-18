import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Workshop from '@/types/workshops/Workshop';
import useJwtToken from '@/hooks/auth/useJwtToken';

interface Params {
  order: 'asc' | 'desc';
  filter: string;
}

const useWorkshops = (
  skip: number = 0,
  take: number = 10,
  serviceId: number = 0,
  favorite: boolean = false,
  params?: Params,
) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [count, setCount] = useState(0);
  const token = useJwtToken();

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
    setLoadingWorkshops(true);
  }, [params?.order, debouncedFilter]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        let res;
        if (!favorite) {
          res = await apiClient.get(
            `workshops?skip=${skip}&take=${take}&serviceId=${serviceId}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } else if (token) {
          res = await apiClient.get(
            `customer/workshops/favorite?skip=${skip}&take=${take}&filter=${debouncedFilter}&order=${params?.order ?? 'asc'}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
        setWorkshops(res?.data.workshops);
        setCount(res?.data.count);
      } catch (err) {
        alert('Al momento il servizio non è disponibile. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoadingWorkshops(false);
      }
    };

    if (loadingWorkshops) {
      fetchWorkshops();
    }
  }, [
    loadingWorkshops,
    params?.order,
    debouncedFilter,
    skip,
    take,
    serviceId,
    favorite,
    token,
  ]);

  return {workshops, loadingWorkshops, setLoadingWorkshops, count};
};

export default useWorkshops;
