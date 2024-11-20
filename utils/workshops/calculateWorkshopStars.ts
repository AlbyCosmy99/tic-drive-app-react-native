import Review from '@/constants/temp/Review';

const calculateWorkshopStars = (reviews: Review[]) => {
  let sumReviewStars = 0;
  reviews.forEach(review => {
    sumReviewStars += review.stars;
  });
  return sumReviewStars / reviews.length;
};

export default calculateWorkshopStars;
