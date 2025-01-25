import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Service from '@/types/Service';

const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get('services');
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

  return {services, loadingServices, setLoadingServices};
};

export default useServices;
