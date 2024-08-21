import { createContext, Dispatch, SetStateAction } from "react";

interface ServicesContextType {
  servicesState: {
    servicePressed: number
  }; 
  setServicesState: Dispatch<SetStateAction<{ servicePressed: number; }>>
}

const defaultContextValue: ServicesContextType = {
  servicesState: { servicePressed: -1},
  setServicesState: () => {}
}

const servicesContext = createContext<ServicesContextType>(defaultContextValue);

export default servicesContext;