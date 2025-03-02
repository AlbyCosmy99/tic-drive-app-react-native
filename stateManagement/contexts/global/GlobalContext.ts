import UserPaymentInfo from '@/types/payment/UserPaymentInfo';
import {createContext} from 'react';

interface GlobalServiceType {
  workshopFilter: string;
  setWorkshopFilter: (workshopFilter: string) => void;
  servicesChoosen: string[];
  setServicesChoosen: (servicesChoosen: string[]) => void;
  carNotFound: boolean;
  setCarNotFound: (carNotFound: boolean) => void;
  userPaymentInfo: UserPaymentInfo | null;
  setUserPaymentInfo: (UserPaymentInfo: UserPaymentInfo) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

const defaultContextValue: GlobalServiceType = {
  workshopFilter: '',
  setWorkshopFilter: () => {},
  servicesChoosen: [],
  setServicesChoosen: () => {},
  carNotFound: true,
  setCarNotFound: () => {},
  userPaymentInfo: {
    choosenCard: null,
    defaultPaymentTypes: [],
    customPaymentTypes: [],
  },
  setUserPaymentInfo: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
};

const GlobalContext = createContext<GlobalServiceType>(defaultContextValue);

export default GlobalContext;
