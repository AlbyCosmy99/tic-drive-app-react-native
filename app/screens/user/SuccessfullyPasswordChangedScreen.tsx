import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import TicDriveSuccessCard from '@/components/ui/cards/notifications/TicDriveSuccessCard';

const SuccessfullyPasswordChangedScreen = () => {
  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <View className="flex-1 justify-center items-center mx-2.5">
        <TicDriveSuccessCard
          title="Successful"
          subtitle="Congratulations! Your password has been changed. Continue to Home."
        />
      </View>
      <TicDriveButton
        replace={true}
        toTop={true}
        text="Home"
        routeName="userTabs"
        routeParams={{animation: 'fade'}}
        stateRouteName="Home"
      />
    </SafeAreaViewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  success: {
    color: Colors.light.ticText,
  },
});

export default SuccessfullyPasswordChangedScreen;
