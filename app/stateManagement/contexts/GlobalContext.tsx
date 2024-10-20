import {Href} from 'expo-router';
import {createContext} from 'react';

interface GlobalServiceType {
  workshopFilter: string;
  setWorkshopFilter: (workshopFilter: string) => void;
  servicesChoosen: string[];
  setServicesChoosen: (servicesChoosen: string[]) => void;
  carNotFound: boolean;
  setCarNotFound: (carNotFound: boolean) => void;
  loginBtnCustomPath?: Href;
  setLoginBtnCustomPath: (loginBtnCustomPath?: Href) => void;
}

const defaultContextValue: GlobalServiceType = {
  workshopFilter: '',
  setWorkshopFilter: () => {},
  servicesChoosen: [],
  setServicesChoosen: () => {},
  carNotFound: true,
  setCarNotFound: () => {},
  loginBtnCustomPath: undefined,
  setLoginBtnCustomPath: () => {},
};

const GlobalContext = createContext<GlobalServiceType>(defaultContextValue);

export default GlobalContext;
