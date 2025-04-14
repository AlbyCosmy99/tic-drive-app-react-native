import {ScrollView, Text, View} from 'react-native';

// Navigation & State
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';

// Layouts
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

// UI Components
import NotLogged from '@/components/auth/NotLogged';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import {handleLogout} from '@/components/ui/buttons/TicDriveAuthButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import IconTextPair from '@/components/ui/IconTextPair';

// Utils & Hooks
import useJwtToken from '@/hooks/auth/useJwtToken';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

// Icons
import HeartIcon from '@/assets/svg/emotions/EmptyHeart.svg';
import CustomerServiceIcon from '@/assets/svg/headphone.svg';
import Logout from '@/assets/svg/logout.svg';
import AddressIcon from '@/assets/svg/map.svg';
import MailIcon from '@/assets/svg/notifications/mail.svg';
import PhoneIcon from '@/assets/svg/notifications/phone.svg';
import Remove from '@/assets/svg/remove.svg';
import VehicleIcon from '@/assets/svg/vehicles/car2.svg';
import EditIcon from '@/assets/svg/writing/change.svg';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="my-4">
    <Text className="font-medium text-2xl">{title}</Text>
    {children}
  </View>
);

export default function UserAccount() {
  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const navigation = useTicDriveNavigation();

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', {favorite: true});
  };

  const onEditProfile = () => {
    navigationPush(navigation, 'EditUserProfileScreen');
  };

  if (!token)
    return (
      <LinearGradientViewLayout>
        <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
          <TicDriveNavbar />
          <NotLogged />
        </SafeAreaViewLayout>
      </LinearGradientViewLayout>
    );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar />
        <View className="mx-2.5">
          {/* Header Info */}
          <View className="flex-row justify-between items-center mt-1 mb-4">
            <View className="flex-row items-center">
              <CircularUserAvatar
                uri={user?.imageurl}
                styles={{width: 70, height: 70, marginRight: 10}}
              />
              <View>
                <Text className="font-semibold text-xl">{user?.name}</Text>
                <Text className="text-tic">Padova, Italy</Text>
              </View>
            </View>
            <View className="flex-row items-center self-start mt-4">
              <EditIcon width={20} height={20} />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={onEditProfile}
              >
                <Text className="text-green-600 font-medium ml-1">Edit</Text>
              </CrossPlatformButtonLayout>
            </View>
          </View>

          <HorizontalLine />

          <ScrollView className="px-1">
            {/* Account Info */}
            <Section title="Account">
              <IconTextPair
                text={user?.phoneNumber || 'Not available'}
                icon={<PhoneIcon />}
                textTailwindCss="text-base font-medium pl-1"
                containerTailwindCss="py-2"
              />
              <HorizontalLine />
              <IconTextPair
                text={user?.email || 'Not available'}
                icon={<MailIcon />}
                textTailwindCss="text-base font-medium pl-1"
                containerTailwindCss="py-2 my-0"
              />
              <HorizontalLine />
              <IconTextPair
                text={user?.address || 'Not available'}
                icon={<AddressIcon />}
                textTailwindCss="text-base font-medium pl-1"
                containerTailwindCss="py-2 my-0"
              />
              <HorizontalLine />

              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => navigationPush(navigation, 'UserVehiclesScreen')}
              >
                <IconTextPair
                  text="Registered vehicles"
                  icon={<VehicleIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={onFavoriteWorkshops}
              >
                <IconTextPair
                  text="Favorite workshops"
                  icon={<HeartIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
            </Section>
            {/* Support */}
            <Section title="Help and support">
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => alert('Customer support')}
              >
                <IconTextPair
                  text="Customer support"
                  icon={<CustomerServiceIcon />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => handleLogout(dispatch, navigation)}
              >
                <IconTextPair
                  text="Logout"
                  icon={<Logout />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0"
                />
              </CrossPlatformButtonLayout>
              <HorizontalLine />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() => alert('Eliminate account')}
              >
                <IconTextPair
                  text="Delete account"
                  icon={<Remove />}
                  textTailwindCss="text-base font-medium pl-1"
                  containerTailwindCss="py-2 my-0"
                />
              </CrossPlatformButtonLayout>
            </Section>
          </ScrollView>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
