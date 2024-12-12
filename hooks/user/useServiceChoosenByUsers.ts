import {useAppSelector} from '@/stateManagement/redux/hooks';

export const useServicesChoosenByUsers = () => {
  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  return servicesChoosenByUsers;
};
