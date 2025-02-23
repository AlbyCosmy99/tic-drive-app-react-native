import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Workshop from '@/types/workshops/Workshop';

const useWorkshops = (
  skip: number = 0,
  take: number = 10,
  serviceId: number = 0,
  cumulative: boolean = false,
) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await apiClient.get(
          `workshops?skip=${skip}&take=${take}&serviceId=${serviceId}`,
        );
        const newWorkshops = res.data.workshops;
        if (cumulative) {
          setWorkshops([...workshops, ...newWorkshops]);
        } else {
          setWorkshops(newWorkshops);
        }
        setCount(res.data.count);
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
  }, [loadingWorkshops]);

  return {workshops, loadingWorkshops, setLoadingWorkshops, count};
};

export default useWorkshops;
