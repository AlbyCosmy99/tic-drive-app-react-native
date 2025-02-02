interface Workshop {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  profileImageUrl: string;
  meanStars: number;
  numberOfReviews: number;
  ProfileImageUrl: string;
  servicePrice?: number;
  currency?: string;
  discount?: number;
  favourite?: boolean;
  isVerified?: boolean;
}

export default Workshop;
