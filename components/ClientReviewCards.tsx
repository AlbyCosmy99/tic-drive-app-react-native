import {View} from 'react-native';
import ClientReviewCard from './ClientReviewCard';
import useReviews from '@/hooks/api/workshops/useReviews';
import TicDriveSpinner from './ui/spinners/TicDriveSpinner';


interface ClientReviewCardsProp {
  workshopId: number;
}

export default function ClientReviewCards({workshopId}: ClientReviewCardsProp) {
  const {reviews, loadingReviews} = useReviews(workshopId);
  return loadingReviews ? (
    <TicDriveSpinner />
  ) : (
    <View>
      {reviews.map((review, index) => (
        <ClientReviewCard review={review} key={index} />
      ))}
    </View>
  );
}
