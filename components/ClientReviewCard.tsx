import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, View} from 'react-native';
import Star from '../assets/svg/star.svg';
import Review from '../constants/temp/Review';
import {memo} from 'react';
import CircularUserAvatar from './ui/avatars/CircularUserAvatar';

type ClientReviewCardProps = {
  review: Review;
};

function ClientReviewCard({review}: ClientReviewCardProps) {
  const calculateTimeFromReview = (when: Date) => {
    const days = (Date.now() - when.getTime()) / (1000 * 60 * 60 * 24);
    if (days < 30) return Math.floor(days) + ' days ago';
    if (days < 365) return Math.floor(days / 30) + ' months ago';
    const years = Math.floor(days / 365);
    return years + (years === 1 ? ' year' : ' years') + ' ago';
  };

  return (
    <View
      className="flex-1 mt-5 pt-3.5 border-t-2"
      style={styles.reviewContainer}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          <View>
            <CircularUserAvatar uri={review.authorImageUrl} />
          </View>
          <View className="justify-center ml-2.5">
            <Text className="text-base font-medium">{review.authorName}</Text>
            <Text className="text-base">
              {calculateTimeFromReview(review.when)}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-2.5 mr-3.5 gap-0.5">
          <Star width={24} fill={Colors.light.ticText} />
          <Text className="text-lg">{review.stars}</Text>
        </View>
      </View>
      <View className="mt-2.5">
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    borderTopColor: '#ebebeb',
  },
  when: {
    color: Colors.light.placeholderText,
  },
  reviewText: {
    color: Colors.light.ticText,
  },
});

export default memo(ClientReviewCard);
