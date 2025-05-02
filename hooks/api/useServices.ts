import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Service from '@/types/Service';
import { useAppSelector } from '@/stateManagement/redux/hooks';

const useServices = (workshopId?: number) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
    const languageCode = useAppSelector(state => state.language.languageCode);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get(
          'services?workshopId=' + (workshopId ? workshopId : '') + '&languageCode=' + languageCode,
        );
        setServices(res.data);
      } catch (err) {
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
