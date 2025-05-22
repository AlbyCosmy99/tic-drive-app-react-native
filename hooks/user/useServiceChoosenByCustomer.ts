import {useAppSelector} from '@/stateManagement/redux/hooks';

export const useServiceChoosenByCustomer = () => {
  const serviceChoosen = useAppSelector(state => state.booking.service);

  return serviceChoosen;
};
