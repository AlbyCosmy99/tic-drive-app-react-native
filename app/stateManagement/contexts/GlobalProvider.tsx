import { FC, ReactNode, useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [workshopFilter, setWorkshopFilter] = useState<string>("");
    const [servicesChoosen, setServicesChoosen] = useState<string[]>([]);
  
    return (
      <GlobalContext.Provider
        value={{
          workshopFilter,
          setWorkshopFilter,
          servicesChoosen,
          setServicesChoosen,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
};

export default GlobalProvider