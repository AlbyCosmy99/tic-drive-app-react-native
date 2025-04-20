import {Colors} from '@/constants/Colors';
import {ActivityIndicator, View} from 'react-native';

interface TicDriveSpinnerProps {
  tailwindCssContainer?: string;
}

const TicDriveSpinner: React.FC<TicDriveSpinnerProps> = ({
  tailwindCssContainer = '',
}) => {
  return (
    <View
      className={`flex-1 justify-center items-center ${tailwindCssContainer}`}
    >
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    </View>
  );
};

export default TicDriveSpinner;
