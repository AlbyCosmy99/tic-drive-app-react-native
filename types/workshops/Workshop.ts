import {TicDriveImage} from '../files/TicDriveImage';

interface Workshop {
  id: string;
  name: string;
  surname?: string;
  workshopName: string;
  address: string;
  longitude: number;
  latitude: number;
  meanStars: number;
  numberOfReviews: number;
  servicePrice?: number;
  currency?: string;
  discount?: number;
  isFavorite?: boolean;
  isVerified?: boolean;
  images: TicDriveImage[];
}

export default Workshop;
