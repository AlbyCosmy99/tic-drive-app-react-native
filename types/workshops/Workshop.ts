import Review from '@/constants/temp/Review';

export interface WorkshopMini {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  profileImageUrl: string;
  meanStars: number;
  numberOfReviews: number;
  ProfileImageUrl: string;
}

export interface WorkshopExtended extends WorkshopMini {
  favourite: boolean;
  position: string;
  reviews: Review[];
  freeCancellation: boolean;
  price: string;
  discount: number;
  freeService: string;
  verified: boolean;
  services: string[];
  images: string[];
}

export default WorkshopExtended;
