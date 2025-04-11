import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Workshop from '@/types/workshops/Workshop';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';

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
  const {setErrorMessage} = useGlobalErrors();

  const [debouncedFilter, setDebouncedFilter] = useState<string>(
    params?.filter ?? '',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(params?.filter ?? '');
    }, 500);

    return () => clearTimeout(handler);
  }, [params?.filter]);

  const getUrl = () => {
    const basePath = favorite ? 'customer/workshops/favorite' : 'workshops';
    const query = new URLSearchParams({
      skip: String(skip),
      take: String(take),
      filter: debouncedFilter,
      order: params?.order ?? 'asc',
    });

    if (!favorite) query.append('serviceId', String(serviceId));
    return `${basePath}?${query.toString()}`;
  };

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        if (!token) return;

        const res = await apiClient.get(getUrl(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkshops(res.data.workshops);
        setCount(res.data.count);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage(
            'An unknown error occurred while fetching workshops.',
          );
        }
      } finally {
        setLoadingWorkshops(false);
      }
    };

    setLoadingWorkshops(true);
    fetchWorkshops();
  }, [skip, take, serviceId, favorite, params?.order, debouncedFilter, token]);

  return {workshops, loadingWorkshops, setLoadingWorkshops, count};
};

export default useWorkshops;
