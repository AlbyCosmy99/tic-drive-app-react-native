import {createContext} from 'react';

interface AuthContextType {
  //to do: tenere un unico oggetto di loginRouteName e considerare di non utilizzare il context
  loginRouteName: string;
  setLoginRouteName: (loginRouteName: string) => void;
  loginRouteParams: any;
  setLoginRouteParams: (loginRouteParams: any) => void;
}

const initialState: AuthContextType = {
  loginRouteName: '',
  setLoginRouteName: () => {},
  loginRouteParams: {},
  setLoginRouteParams: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
