import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Service from '@/types/Service';
import { useAppSelector } from '@/stateManagement/redux/hooks';

const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const workshopId = useAppSelector(state => state.workshops.selectedWorkshop)?.id

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get('services?workshopId=' + (workshopId ? workshopId : ''));
        setServices(res.data);
      } catch (err) {
        alert('Al momento il servizio non è disponibile. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoadingServices(false);
      }
    };

    if (loadingServices) {
      fetchServices();
    }
  }, [loadingServices]);

  useEffect(() => {
    setLoadingServices(true)
  }, [workshopId])

  return {services, loadingServices, setLoadingServices};
};

export default useServices;
