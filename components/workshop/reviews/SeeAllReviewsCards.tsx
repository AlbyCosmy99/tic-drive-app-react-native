import ClientReviewCard from '@/components/ClientReviewCard';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import useReviews from '@/hooks/api/workshops/useReviews';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';

const SeeAllReviewsCards = ({workshopId}: {workshopId: number}) => {
  const {reviews, loadingReviews} = useReviews(workshopId, 0, 2);

  const handleOnSeeAllReviews = () => {
    console.log('all reviews');
  };

  return loadingReviews ? (
    <LoadingSpinner />
  ) : (
    reviews.length && (
      <View>
        <ClientReviewCard review={reviews[0]} key={reviews[0].id} />
        {reviews.length > 1 && (
          <Pressable
            className="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl"
            onPress={handleOnSeeAllReviews}
          >
            <Text className="text-base font-medium">See all reviews</Text>
          </Pressable>
        )}
      </View>
    )
  );
};

export default SeeAllReviewsCards;
