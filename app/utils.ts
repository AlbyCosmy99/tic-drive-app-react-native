import Review from '@/constants/temp/Review';
import * as SecureStore from 'expo-secure-store';

export const calculateDiscountPrice = (price: string, discount: number) => {
  const priceValue = parseInt(price.slice(1));
  return priceValue - (priceValue * discount) / 100;
};

export const calculateWorkshopStars = (reviews: Review[]) => {
  let sumReviewStars = 0;
  reviews.forEach(review => {
    sumReviewStars += review.stars;
  });
  return sumReviewStars / reviews.length;
};

export const saveLoginStatus = async (isLoggedIn: boolean) => {
  try {
    await SecureStore.setItemAsync('isUserLogged', JSON.stringify(isLoggedIn));
  } catch (e) {
    throw new Error('Failed to save login status securely: ' + e);
  }
};

export const getLoginStatus = async () => {
  try {
    const value = await SecureStore.getItemAsync('isUserLogged');
    return value ? JSON.parse(value) : false;
  } catch (e) {
    throw new Error('Failed to retrieve login status securely: ' + e);
  }
};
