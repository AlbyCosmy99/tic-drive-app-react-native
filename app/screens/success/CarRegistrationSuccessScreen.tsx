import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveSuccessCard from '@/components/ui/cards/notifications/TicDriveSuccessCard';
import {Colors} from '@/constants/Colors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';
import navigationReset from '@/services/navigation/reset';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const CarRegistrationSuccessScreen = () => {
  const navigation = useTicDriveNavigation();
  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <View className="flex-1 justify-center items-center mx-2.5">
        <TicDriveSuccessCard
          title="Car Registered"
          subtitle="Congratulations! Your car has been registered successfully. Continue to the profile, where you can see your vehicles."
        />
      </View>
      <TicDriveButton
        replace={true}
        toTop={true}
        text="Continue"
        onClick={() => {
          navigationReset(navigation, 0, 'userTabs',{animation: 'fade'},'Profile');
        }}
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

export default CarRegistrationSuccessScreen;
