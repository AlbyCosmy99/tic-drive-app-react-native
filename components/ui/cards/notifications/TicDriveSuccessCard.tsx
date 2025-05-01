import CheckIcon from '@/components/svgs/CheckCircle';
import {Text} from 'react-native';

interface TicDriveSuccessCardProps {
  title: string;
  subtitle: string;
}

const TicDriveSuccessCard: React.FC<TicDriveSuccessCardProps> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <CheckIcon height={60} width={60} />
      <Text className="font-bold text-2xl mt-2">{title}</Text>
      <Text className="text-tic text-base text-center">{subtitle}</Text>
    </>
  );
};

export default TicDriveSuccessCard;
