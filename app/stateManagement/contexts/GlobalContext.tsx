import { createContext} from "react";

interface GlobalServiceType {
  workshopFilter: string;
  setWorkshopFilter: (workshopFilter: string) => void;
  servicesChoosen: string[];
  setServicesChoosen: (servicesChoosen: string[]) => void;
  carNotFound: boolean,
  setCarNotFound: (carNotFound: boolean) => void
}

const defaultContextValue: GlobalServiceType = {
  workshopFilter: "",
  setWorkshopFilter: () => {},
  servicesChoosen: [],
  setServicesChoosen: () => {},
  carNotFound: true,
  setCarNotFound: () => {}
};

const GlobalContext = createContext<GlobalServiceType>(defaultContextValue);

export default GlobalContext;
