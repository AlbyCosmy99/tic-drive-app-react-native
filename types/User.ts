import {LatLng} from 'react-native-maps';
import { TicDriveImage } from './files/TicDriveImage';

export default interface User {
  userId?: string;
  name?: string | undefined;
  email?: string;
  category?: UserCategory;
  emailConfirmed?: boolean;
  password?: string;
  repeatedPassword?: string;
  image?: TicDriveImage;
  phoneNumber?: string;
  address?: string;
  coordinates?: LatLng;
}

export type UserCategory = 'user' | 'workshop';
