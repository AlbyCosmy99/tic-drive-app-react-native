import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import {WorkshopMini} from '@/types/workshops/Workshop';

const useWorkshops = (skip: number = 0, take: number = 10) => {
  const [workshops, setWorkshops] = useState<WorkshopMini[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await apiClient.get(`workshops?skip=${skip}&take=${take}`);
        setWorkshops(res.data);
      } catch (err) {
        alert('Al momento il servizio non è disponibile. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoadingWorkshops(false);
      }
    };

    fetchWorkshops();
  }, []);

  return {workshops, loadingWorkshops};
};

export default useWorkshops;
