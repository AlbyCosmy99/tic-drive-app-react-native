import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {Colors} from '@/constants/Colors';
import {Text, View} from 'react-native';
import AccountIcon from '@/assets/svg/accountIcon.svg';
import IconTextPair from '@/components/ui/IconTextPair';
import LockIcon from '@/assets/svg/access/lock.svg';
import NotificationsIcon from '@/assets/svg/notifications/notifications.svg';
import SupportIcon from '@/assets/svg/support/support.svg';
import FeedbackIcon from '@/assets/svg/writing/feedback.svg';
import TicDriveAuthButton from '@/components/ui/buttons/TicDriveAuthButton';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import {useTranslation} from 'react-i18next';

const UserAccountDetailsScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const {t} = useTranslation();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <View className="flex-1">
          <TicDriveNavbar canGoBack={true} />
          <View className="flex flex-row justify-center items-center mb-4">
            <Text className="font-bold text-2xl text-center mb-2 mt-1">
              {t('menu')}
            </Text>
          </View>
          <View className="flex flex-row items-center mb-4">
            <CircularUserAvatar
              styles={{
                width: 70,
                height: 70,
                marginRight: 10,
              }}
              uri="https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0"
            />
            <Text className="font-semibold text-xl">{user!.name}</Text>
          </View>
          <HorizontalLine color={Colors.light.lightGrey} />
          <View className="my-4">
            <Text className="text-tic mb-2">{t('generalSettings')}</Text>
            <IconTextPair
              text={t('profile')}
              icon={<AccountIcon fill={Colors.light.ticText} />}
            />
            <IconTextPair
              text={t('password')}
              icon={<LockIcon fill={Colors.light.ticText} />}
            />
            <IconTextPair
              text={t('notifications')}
              icon={<NotificationsIcon fill={Colors.light.ticText} />}
              containerTailwindCss="pb-1"
            />
          </View>
          <HorizontalLine color={Colors.light.lightGrey} />
          <View className="my-4">
            <Text className="text-tic mb-2">{t('other')}</Text>
            <IconTextPair
              text={t('support')}
              icon={<SupportIcon fill={Colors.light.ticText} />}
            />
            <IconTextPair
              text={t('feedback')}
              icon={<FeedbackIcon fill={Colors.light.ticText} />}
              containerTailwindCss="pb-1"
            />
          </View>
          <HorizontalLine color={Colors.light.lightGrey} />
          <Text className="text-tic text-sm my-2.5 font-semibold">
            {t('deleteAccount')}
          </Text>
        </View>
        <View className="mb-2.5">
          <Text className="text-center my-3.5">{t('termsAndPrivacy')}</Text>
          <TicDriveAuthButton action="logout" />
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
};

export default UserAccountDetailsScreen;
