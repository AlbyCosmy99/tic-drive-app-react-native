import {setSecureToken} from '@/services/auth/secureStore/setToken';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {
  login as stateLogin,
  setToken,
} from '@/stateManagement/redux/slices/authSlice';
import User from '@/types/User';
import {login as authLogin} from '@/services/auth/login';
import getUserData from '@/utils/auth/formatUserData';
import useGlobalErrors from '../errors/useGlobalErrors';
import formatUserData from '@/utils/auth/formatUserData';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const {setErrorMessage} = useGlobalErrors();

  const login = async (user: User) => {
    try {
      const res = await authLogin(user);
      setSecureToken(res.token);
      dispatch(setToken(res.token));
      const data = await getUserData(res.token);
      dispatch(stateLogin(formatUserData(data)));
      return res;
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  return {login};
};

export default useLogin;
