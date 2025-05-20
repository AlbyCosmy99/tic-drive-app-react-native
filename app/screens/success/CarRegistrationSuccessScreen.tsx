import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveSuccessCard from '@/components/ui/cards/notifications/TicDriveSuccessCard';
import {Colors} from '@/constants/Colors';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationReset from '@/services/navigation/reset';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

const CarRegistrationSuccessScreen = () => {
  const navigation = useTicDriveNavigation();
    const {t} = useTranslation();
  
  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <View className="flex-1 justify-center items-center mx-2.5">
        <TicDriveSuccessCard
           title={t('car_registration.success_title')}
  subtitle={t('car_registration.success_subtitle')}
        />
      </View>
      <TicDriveButton
        replace={true}
        toTop={true}
       text={t('continue')}
        onClick={() => {
          navigationReset(
            navigation,
            0,
            'userTabs',
            {animation: 'fade'},
            'Profile',
          );
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
