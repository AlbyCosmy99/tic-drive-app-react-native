import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Workshop from '@/types/workshops/Workshop';

const useWorkshops = (
  skip: number = 0,
  take: number = 10,
  serviceId: number = 0,
) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await apiClient.get(
          `workshops?skip=${skip}&take=${take}&serviceId=${serviceId}`,
        );
        setWorkshops(res.data);
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

  return {workshops, loadingWorkshops, setLoadingWorkshops};
};

export default useWorkshops;
