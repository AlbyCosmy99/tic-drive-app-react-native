import ClientReviewCard from '@/components/ClientReviewCard';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import useReviews from '@/hooks/api/workshops/useReviews';
import {Text, View, StyleSheet} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';

const SeeAllReviewsCards = ({workshopId}: {workshopId: number}) => {
  const {reviews, loadingReviews} = useReviews(workshopId, 0, 2);

  const handleOnSeeAllReviews = () => {
    console.log('all reviews');
  };

  if (loadingReviews) return <LoadingSpinner />;
  if (!reviews?.length) return null; // ✅ Ensures we don't return `0`

  return (
    <View>
      <ClientReviewCard review={reviews[0]} key={reviews[0].id} />
      {reviews.length > 1 && (
        <Pressable style={styles.button} onPress={handleOnSeeAllReviews}>
          <Text style={styles.text}>See all reviews</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SeeAllReviewsCards;
