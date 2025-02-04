import {StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import CircularUserAvatar from './ui/avatars/CircularUserAvatar';
import Review from '@/types/workshops/Review';
import GradeIcon from '@/assets/svg/grades/grade.svg';

type ClientReviewCardProps = {
  review: Review;
};

function ClientReviewCard({review}: ClientReviewCardProps) {
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
    <View style={[styles.container, styles.shadow]}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row">
          <CircularUserAvatar uri={review.authorImageUrl} />
          <View className="ml-2.5 flex-1">
            <View className="flex-row justify-between">
              <View className="justify-center">
                <Text className="text-base font-medium">Nome autore</Text>
              </View>
              <View className="flex-row items-center mt-2.5 mr-3.5 gap-0.5">
                {Array.from({length: review.stars}).map((_, index) => (
                  <GradeIcon key={index} />
                ))}
              </View>
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
    flex: 1,
    marginTop: 20,
    paddingTop: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default memo(ClientReviewCard);
