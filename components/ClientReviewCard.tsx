import {StyleSheet, Text, View} from 'react-native';
import {memo, useEffect} from 'react';
import CircularUserAvatar from './ui/avatars/CircularUserAvatar';
import Review from '@/types/workshops/Review';
import FiveStarsGrade from './ui/grades/FiveStarsGrade';

type ClientReviewCardProps = {
  review: Review;
};

function ClientReviewCard({review}: ClientReviewCardProps) {
  useEffect(() => {
    console.log('review', review)
  }, [])
  function timeAgo(propDate: Date) {
    const date = new Date(propDate);
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

    const units: {[key: string]: number} = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const unit in units) {
      const interval = Math.floor(secondsDiff / units[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  return (
    <View className='my-1.5' style={[styles.container, styles.shadow]}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row">
          <CircularUserAvatar uri={review.customerImageUrl} />
          <View className="ml-2.5 flex-1">
            <View className="flex-row justify-between">
              <View className="justify-center">
                <Text className="text-base font-medium">
                  {review.customerName}
                </Text>
              </View>
              <FiveStarsGrade stars={review.stars} />
            </View>
            <Text className="text-sm text-tic">
              {timeAgo(review.whenPublished)}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-2.5">
        <Text className="text-tic text-base">{review.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default memo(ClientReviewCard);
