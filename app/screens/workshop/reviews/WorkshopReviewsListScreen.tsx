import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import ClientReviewCard from '@/components/ClientReviewCard';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import ReviewsProgressStars from '@/components/workshop/reviews/ReviewsProgressStars';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import useReviews from '@/hooks/api/workshops/useReviews';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';

const WorkshopReviewsListScreen = () => {
  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );
  const skip = 0;
  const take = 10;
  const {reviews, loadingReviews, setLoadingReviews} = useReviews(
    selectedWorkshop?.id!,
    skip,
    take,
  );

  useEffect(() => {
    console.log(reviews)
  }, [reviews])

  const fiveStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 5).length;
  }, [reviews]);

  const fourStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 4).length;
  }, [reviews]);

  const threeStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 3).length;
  }, [reviews]);

  const twoStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 2).length;
  }, [reviews]);

  const oneStarReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 1).length;
  }, [reviews]);

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar
        topContent={<Text className="text-lg font-semibold">Reviews</Text>}
        containerTailwindCss="h-10 items-end"
      />
      <View className="ml-5 mr-3">
        <View className="mb-2.5">
          <WorkshopReviewinfo
            meanStars={selectedWorkshop?.meanStars}
            numberOfReviews={selectedWorkshop?.numberOfReviews}
            containerTailwindCss="justify-center items-center"
            textTailwindCss="text-base font-medium"
          />
        </View>
        <ReviewsProgressStars reviews={fiveStarsReviews} stars={5} />
        <ReviewsProgressStars reviews={fourStarsReviews} stars={4} />
        <ReviewsProgressStars reviews={threeStarsReviews} stars={3} />
        <ReviewsProgressStars reviews={twoStarsReviews} stars={2} />
        <ReviewsProgressStars reviews={oneStarReviews} stars={1} />
      </View>
      {
        !loadingReviews && (
          <View className='mt-4'>
            <ClientReviewCard review={reviews[0]} />
            <ClientReviewCard review={reviews[0]} />
            <ClientReviewCard review={reviews[0]} />
          </View>
        )
      }
    </SafeAreaViewLayout>
  );
};

export default WorkshopReviewsListScreen;
