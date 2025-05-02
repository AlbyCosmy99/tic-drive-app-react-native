import {LatLng} from 'react-native-maps';

export default interface User {
  userId?: string;
  name?: string | undefined;
  email?: string;
  category?: UserCategory;
  emailConfirmed?: boolean;
  password?: string;
  repeatedPassword?: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  coordinates?: LatLng;
}

export type UserCategory = 'user' | 'workshop';
