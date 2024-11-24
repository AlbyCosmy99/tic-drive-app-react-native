import {NavigationProp, NavigationState} from '@react-navigation/native';

type Navigation =
  | (Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
      getState(): NavigationState | undefined;
    })
  | null;

export default Navigation;
