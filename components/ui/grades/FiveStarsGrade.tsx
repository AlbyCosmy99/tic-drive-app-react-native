import {View} from 'react-native';
import GradeIcon from '@/components/svgs/grades/Star';
import EmptyGradeIcon from '@/components/svgs/grades/EmptyStar';

const FiveStarsGrade = ({stars}: {stars: number}) => {
  const MAX_STARS = 5;

  return (
    <View className="flex-row items-center mt-2.5 mr-3.5 gap-0.5">
      {Array.from({length: stars}).map((_, index) => (
        <GradeIcon key={index} />
      ))}
      {Array.from({length: MAX_STARS - stars}).map((_, index) => (
        <EmptyGradeIcon key={index} />
      ))}
    </View>
  );
};
export default FiveStarsGrade;
