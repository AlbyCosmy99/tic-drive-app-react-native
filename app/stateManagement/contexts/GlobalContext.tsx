import React, { createContext, ReactNode, useState, FC, useContext } from "react";

interface GlobalServiceType {
  workshopFilter: string;
  setWorkshopFilter: (workshopFilter: string) => void;
  servicesChoosen: string[];
  setServicesChoosen: (servicesChoosen: string[]) => void;
}

const defaultContextValue: GlobalServiceType = {
  workshopFilter: "",
  setWorkshopFilter: () => {},
  servicesChoosen: [],
  setServicesChoosen: () => {},
};

const GlobalContext = createContext<GlobalServiceType>(defaultContextValue);

export default GlobalContext;
