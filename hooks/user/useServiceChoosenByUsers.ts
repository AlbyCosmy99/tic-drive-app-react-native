import {useAppSelector} from '@/stateManagement/redux/hooks';

export const useServiceChoosenByUsers = () => {
  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  return servicesChoosenByUsers;
};
