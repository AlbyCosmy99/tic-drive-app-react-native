import axiosClient from '@/services/http/axiosClient';
import CarMake from '@/types/cars/CarMake';
import {useEffect, useState} from 'react';

const useCarsMakes = () => {
  const [carsMakes, setCarsMakes] = useState<CarMake[]>([]);
  const [loadingCarsMakes, setLoadingCarsMakes] = useState(true);

  useEffect(() => {
    const fetchCarsMakes = async () => {
      try {
        const res = await axiosClient.get('cars/makes');
        setCarsMakes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCarsMakes(false);
      }
    };
    fetchCarsMakes();
  }, []);

  return {carsMakes, loadingCarsMakes};
};

export default useCarsMakes;
