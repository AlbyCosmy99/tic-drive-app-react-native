import {getPayload} from '@/services/auth/getPayload';
import {setSecureToken} from '@/services/auth/secureStore/setToken';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {
  login as stateLogin,
  setToken,
} from '@/stateManagement/redux/slices/authSlice';
import User from '@/types/User';
import {login as authLogin} from '@/services/auth/login';
import getUserData from '@/utils/auth/getUserData';
import useGlobalErrors from '../errors/useGlobalErrors';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const {setErrorMessage} = useGlobalErrors();

  const login = async (user: User) => {
    try {
      const res = await authLogin(user);
      console.log('here');
      setSecureToken(res.token);
      dispatch(setToken(res.token));
      const payload = await getPayload(res.token);
      dispatch(stateLogin(getUserData(payload)));
      return res;
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  return {login};
};

export default useLogin;
