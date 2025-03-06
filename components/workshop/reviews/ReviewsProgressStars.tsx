import {Colors} from '@/constants/Colors';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import FiveStarsGrade from '@/components/ui/grades/FiveStarsGrade';

interface ReviewsProgressStarsProps {
  reviews: number;
  stars: number;
}

const ReviewsProgressStars: React.FC<ReviewsProgressStarsProps> = ({
  reviews,
  stars,
}) => {
  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-base font-semibold text-tic">{reviews}</Text>
      <Progress.Bar
        progress={reviews / selectedWorkshop?.numberOfReviews!}
        width={200}
        height={4}
        borderRadius={4}
        borderWidth={0.5}
        color={Colors.light.green.drive}
        unfilledColor={Colors.light.lightGrey}
        borderColor={Colors.light.extremelyLightGrey}
      />
      <FiveStarsGrade stars={stars} />
    </View>
  );
};

export default ReviewsProgressStars;
