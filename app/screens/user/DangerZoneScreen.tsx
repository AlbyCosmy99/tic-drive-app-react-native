import {View, Text} from 'react-native';
import React from 'react';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import IconTextPair from '@/components/ui/IconTextPair';
import Remove from '@/assets/svg/remove.svg';
import {t} from 'i18next';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

export default function DangerZoneScreen() {
  const navigation = useTicDriveNavigation();

  const handleDeleteAccount = () => {
    navigationPush(navigation, 'DeleteAccountScreen');
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar canGoBack />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-4">
            {t('dangerZone.title')}
          </Text>

          <Text className="text-base text-400 mb-6 text-[#fc0600]">
            {t('dangerZone.warningMessage')}
          </Text>

          <CrossPlatformButtonLayout onPress={handleDeleteAccount}>
            <IconTextPair
              text={t('deleteAccount')}
              icon={<Remove />}
              textTailwindCss="text-base font-medium pl-1"
              containerTailwindCss="py-2 my-0 pt-1"
            />
          </CrossPlatformButtonLayout>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
