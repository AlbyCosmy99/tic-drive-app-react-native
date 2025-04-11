import axiosClient from '@/services/http/axiosClient';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useContext, useState} from 'react';

const useCustomerCars = () => {
  const [loadingCustomerCars, setLoadingCustomerCars] = useState(false);
  const {setErrorMessage} = useContext(GlobalContext);
  const token = useAppSelector(state => state.auth.token);

  const getCustomerCars = async () => {
    setLoadingCustomerCars(true);
    try {
      const response = await axiosClient.get('cars/customer-cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setLoadingCustomerCars(false);
    }
  };

  return {getCustomerCars, loadingCustomerCars};
};

export default useCustomerCars;
