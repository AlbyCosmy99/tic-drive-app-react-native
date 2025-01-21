import {Colors} from '@/constants/Colors';
import {ActivityIndicator, View} from 'react-native';

const LoadingSpinner = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    </View>
  );
};

export default LoadingSpinner;
