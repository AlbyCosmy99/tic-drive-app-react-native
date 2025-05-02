import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import TicDriveSuccessCard from '@/components/ui/cards/notifications/TicDriveSuccessCard';
import {useTranslation} from 'react-i18next';

const SuccessfullyPasswordChangedScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <View className="flex-1 justify-center items-center mx-2.5">
        <TicDriveSuccessCard
          title={t('successPasswordChange.success')}
          subtitle={t('successPasswordChange.subtitle')}
        />
      </View>
      <TicDriveButton
        replace={true}
        toTop={true}
        text={t('common.home')}
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
