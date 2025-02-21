import {ScrollView, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import AddIcon from '../../assets/svg/add.svg';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import IconTextPair from '@/components/ui/IconTextPair';
import TicDriveAuthButton from '@/components/ui/buttons/TicDriveAuthButton';
import useJwtToken from '@/hooks/auth/useJwtToken';
import NotLogged from '@/components/auth/NotLogged';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

export default function UserAccount() {
  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <>
            <View className="flex flex-row items-center mb-4 mt-1">
              <CircularUserAvatar
                styles={{
                  width: 70,
                  height: 70,
                  marginRight: 10,
                }}
                uri="https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0"
              />
              <View>
                <Text className="font-semibold text-xl">{user?.name}</Text>
                <Text className="text-tic">New York, USA</Text>
              </View>
            </View>
            <HorizontalLine />
            <ScrollView>
              <View className="my-4">
                <Text className="font-medium text-2xl">Account</Text>
                <View>
                  <IconTextPair
                    text="Phone number"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                  <IconTextPair
                    text="Email"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                  <IconTextPair
                    text="Address"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                  <IconTextPair
                    text="Registered vehicles"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                  <IconTextPair
                    text="Favorite workshops"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                </View>
              </View>
              <HorizontalLine />
              <View className="my-4">
                <Text className="font-medium text-2xl">
                  Payment information
                </Text>
                <View>
                  <IconTextPair
                    text="Payment method"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 pt-2 pb-1"
                  />
                  <IconTextPair
                    text="Receipts"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                </View>
              </View>
              <HorizontalLine />
              <View className="my-4">
                <Text className="font-medium text-2xl">Help and support</Text>
                <View>
                  <IconTextPair
                    text="Customer support"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 pt-2 pb-1"
                  />
                  <IconTextPair
                    text="Security information and resources"
                    icon={<AddIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-1 py-1"
                  />
                </View>
              </View>
              <HorizontalLine />
            </ScrollView>
            <View className="my-2">
              <TicDriveAuthButton action="logout" />
            </View>
          </>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
