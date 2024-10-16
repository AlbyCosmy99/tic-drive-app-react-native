import {View} from 'react-native';
import ClientReviewCard from './ClientReviewCard';
import workshops from '@/constants/temp/Workshops';

interface ClientReviewCardsProp {
  id: string;
}

export default function ClientReviewCards({id}: ClientReviewCardsProp) {
  return (
    <View>
      {workshops
        .filter(workshop => workshop.id === parseInt(id))[0]
        .reviews.map((review, index) => {
          return <ClientReviewCard review={review} key={index} />;
        })}
    </View>
  );
}
