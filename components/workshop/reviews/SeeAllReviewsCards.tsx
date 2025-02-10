import ClientReviewCard from '@/components/ClientReviewCard';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import useReviews from '@/hooks/api/workshops/useReviews';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';

const SeeAllReviewsCards = ({workshopId}: {workshopId: number}) => {
  const {reviews, loadingReviews} = useReviews(workshopId, 0, 2);
  const {navigation} = useContext(NavigationContext);
  const handleOnSeeAllReviews = () => {
    navigationPush(navigation, 'WorkshopReviewsListScreen');
  };

  if (loadingReviews) return <LoadingSpinner />;
  if (!reviews?.length) return null;

  return (
    <View>
      <ClientReviewCard review={reviews[0]} key={reviews[0].id} />
      {reviews.length > 1 && (
        <Pressable
          className="mt-4 border-grey-light"
          style={styles.button}
          onPress={handleOnSeeAllReviews}
        >
          <Text className="my-0.5 text-base font-medium">See all reviews</Text>
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
    borderRadius: 12,
  },
});

export default SeeAllReviewsCards;
