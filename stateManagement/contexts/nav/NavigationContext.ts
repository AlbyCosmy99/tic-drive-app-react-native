import Navigation from '@/types/nav/Navigation';
import {createContext} from 'react';

interface NavigationContextType {
  navigation: Navigation;
  setNavigation: (navigation: NavigationContextType['navigation']) => void;
}

const initialState: NavigationContextType = {
  navigation: null,
  setNavigation: () => {},
};

const NavigationContext = createContext<NavigationContextType>(initialState);

export default NavigationContext;
