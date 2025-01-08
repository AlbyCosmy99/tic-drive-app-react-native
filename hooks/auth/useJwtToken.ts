import {useAppSelector} from '@/stateManagement/redux/hooks';

const useJwtToken = () => {
  const token = useAppSelector(state => state.auth.token);
  return token;
};

export default useJwtToken;
