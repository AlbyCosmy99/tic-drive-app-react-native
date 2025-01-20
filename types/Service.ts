import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

interface Service {
  id: number;
  name: string; //to-do: title???
  description?: string;
  icon: string | FC<SvgProps>;
}

export default Service;
