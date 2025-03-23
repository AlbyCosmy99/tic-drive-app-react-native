import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import CheckIcon from '@/assets/svg/check_circle.svg';

const SuccessfullyPasswordChangedScreen = () => {
  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <View className="flex-1 justify-center items-center mx-2.5">
        <CheckIcon height={60} width={60} />
        <Text className="font-bold text-2xl mt-2">Successful</Text>
        <Text className="text-tic text-base text-center">
          Congratulations! Your password has been changed. Continue to Home.
        </Text>
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
