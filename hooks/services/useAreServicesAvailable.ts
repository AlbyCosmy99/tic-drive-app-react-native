import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useEffect, useMemo} from 'react';

const useAreServicesAvailable = () => {
  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  const areServicesOn = useAppSelector(
    state => state.services.areServicesOn,
  );

  const areServicesAvailable = useMemo(() => areServicesOn && servicesChoosenByUsers?.length > 0, [servicesChoosenByUsers,areServicesOn])

  return {areServicesAvailable};
};

export default useAreServicesAvailable;
