import { View, Text } from 'react-native';
import React from 'react';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import IconTextPair from '@/components/ui/IconTextPair';
import Remove from '@/assets/svg/remove.svg';
import LockIcon from '@/assets/svg/remove.svg'; 
import DevicesIcon from '@/assets/svg/remove.svg'; 
import { t } from 'i18next';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

export default function DangerZoneScreen() {
  const navigation = useTicDriveNavigation();

  const handleDeleteAccount = () => {
    navigationPush(navigation, 'DeleteAccountScreen');
  };

  const handleRevokeDevices = () => {
    console.log('Revoke all devices');
  };

  const handleDataWipe = () => {
    console.log('Wipe personal data');
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar canGoBack />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-4">
            {t('dangerZone.title', 'Danger Zone')}
          </Text>

          <Text className="text-base text-red-600 mb-6">
            {t(
              'dangerZone.warningMessage',
              '⚠️ This is a sensitive area. Actions here are irreversible and may affect your data or access. Proceed with caution.'
            )}
          </Text>

          <CrossPlatformButtonLayout onPress={handleDataWipe}>
            <IconTextPair
              text={t('dangerZone.clearPersonalData', 'Clear personal data')}
              icon={<LockIcon />}
              textTailwindCss="text-base font-medium pl-1 text-yellow-700"
              containerTailwindCss="py-2 my-0 pt-1"
            />
          </CrossPlatformButtonLayout>

          <CrossPlatformButtonLayout onPress={handleRevokeDevices}>
            <IconTextPair
              text={t('dangerZone.revokeDevices', 'Revoke all devices')}
              icon={<DevicesIcon />}
              textTailwindCss="text-base font-medium pl-1 text-yellow-700"
              containerTailwindCss="py-2 my-0 pt-1"
            />
          </CrossPlatformButtonLayout>

          <CrossPlatformButtonLayout onPress={handleDeleteAccount}>
            <IconTextPair
              text={t('dangerZone.deleteAccount', 'Delete account')}
              icon={<Remove />}
              textTailwindCss="text-base font-medium pl-1 text-red-600"
              containerTailwindCss="py-2 my-0 pt-1"
            />
          </CrossPlatformButtonLayout>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
