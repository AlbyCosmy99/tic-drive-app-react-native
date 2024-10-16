import {FC, ReactNode, useState} from 'react';
import GlobalContext from './GlobalContext';
import {Href} from 'expo-router';

const GlobalProvider: FC<{children: ReactNode}> = ({children}) => {
  const [workshopFilter, setWorkshopFilter] = useState<string>('');
  const [servicesChoosen, setServicesChoosen] = useState<string[]>([]);
  const [carNotFound, setCarNotFound] = useState<boolean>(true);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [loginBtnCustomPath, setLoginBtnCustomPath] = useState<
    Href | undefined
  >(undefined);

  return (
    <GlobalContext.Provider
      value={{
        workshopFilter,
        setWorkshopFilter,
        servicesChoosen,
        setServicesChoosen,
        carNotFound,
        setCarNotFound,
        isUserLogged,
        setIsUserLogged,
        loginBtnCustomPath,
        setLoginBtnCustomPath,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
