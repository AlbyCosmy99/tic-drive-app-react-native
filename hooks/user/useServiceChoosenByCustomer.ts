import {useAppSelector} from '@/stateManagement/redux/hooks';

export const useServiceChoosenByCustomer = () => {
  const servicesChoosen = useAppSelector(state => state.booking.services);

  return servicesChoosen;
};
