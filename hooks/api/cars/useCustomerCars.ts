import axiosClient from '@/services/http/axiosClient';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import Car from '@/types/Car';
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

      const mappedCars = response.data.map((car: any) => ({
        ...car,
        name: car.carName, // Map `carName` to `name` for the frontend
      }));

      return mappedCars;
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

  const registerCustomerCar = async (car: Car) => {
    try {
      setLoadingCustomerCars(true);
      await axiosClient.post(
        'cars',
        {
          plate: car.plateNumber,
          make: car.make,
          model: car.model,
          year: car.year,
          fuelType: car.fuel,
          transmissionType: car.transmission,
          engineDisplacement: car.engineDisplacement,
          mileage: car.mileage,
          cv: car.powerCV,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setLoadingCustomerCars(false);
    }
  };

  return {getCustomerCars, registerCustomerCar, loadingCustomerCars};
};

export default useCustomerCars;
