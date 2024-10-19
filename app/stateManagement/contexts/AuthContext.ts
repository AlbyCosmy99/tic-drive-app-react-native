import { createContext } from "react";

interface AuthContextType {
  isUserLogged: boolean;
  setIsUserLogged: (isLogged: boolean) => void;
}

const initialState: AuthContextType = {
  isUserLogged: false,
  setIsUserLogged: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
