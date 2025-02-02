import {View} from 'react-native';
import ClientReviewCard from './ClientReviewCard';
import useReviews from '@/hooks/api/workshops/useReviews';

interface ClientReviewCardsProp {
  workshopId: number;
}

export default function ClientReviewCards({workshopId}: ClientReviewCardsProp) {
  const {reviews} = useReviews(workshopId);
  return (
    <View>
      {reviews.map((review, index) => (
        <ClientReviewCard review={review} key={index} />
      ))}
    </View>
  );
}
