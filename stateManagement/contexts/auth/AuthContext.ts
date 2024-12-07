import {createContext} from 'react';

interface AuthContextType {
  isUserLogged: boolean;
  setIsUserLogged: (isLogged: boolean) => void;
  //to do: tenere un unico oggetto di loginRouteName e considerare di non utilizzare il context
  loginRouteName: string;
  setLoginRouteName: (loginRouteName: string) => void;
  loginRouteParams: any;
  setLoginRouteParams: (loginRouteParams: any) => void;
}

const initialState: AuthContextType = {
  isUserLogged: false,
  setIsUserLogged: () => {},
  loginRouteName: '',
  setLoginRouteName: () => {},
  loginRouteParams: {},
  setLoginRouteParams: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
