import Workshop from '@/types/workshops/Workshop';
import {LatLng} from 'react-native-maps';

export interface POIMarker {
  coordinate: LatLng;
  price: number;
  currency: string;
  id: number;
  workshopName: string;
  workshop: Workshop;
}
