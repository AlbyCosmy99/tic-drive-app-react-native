import {ScrollView, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import IconTextPair from '@/components/ui/IconTextPair';
import {handleLogout} from '@/components/ui/buttons/TicDriveAuthButton';
import useJwtToken from '@/hooks/auth/useJwtToken';
import NotLogged from '@/components/auth/NotLogged';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import PhoneIcon from '@/assets/svg/notifications/phone.svg';
import MailIcon from '@/assets/svg/notifications/mail.svg';
import AddressIcon from '@/assets/svg/notifications/address.svg';
import VehicleIcon from '@/assets/svg/vehicles/car2.svg';
import HeartIcon from '@/assets/svg/emotions/EmptyHeart.svg';
import CreditCardIcon from '@/assets/svg/payment/creditCard.svg';
import ReceiptIcon from '@/assets/svg/payment/receipt.svg';
import CustomerServiceIcon from '@/assets/svg/support/customerService.svg';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

export default function UserAccount() {
  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const navigation = useTicDriveNavigation();

  const onFavoriteWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen', {favorite: true});
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <View className="mx-2.5">
            <View className="flex flex-row items-center mb-4 mt-1">
              <CircularUserAvatar
                styles={{
                  width: 70,
                  height: 70,
                  marginRight: 10,
                }}
                uri={user?.imageurl}
              />
              <View>
                <Text className="font-semibold text-xl">{user?.name}</Text>
                <Text className="text-tic">New York, USA</Text>
              </View>
            </View>
            <HorizontalLine />
            <ScrollView className="px-1">
              <View className="my-4">
                <Text className="font-medium text-2xl">Account</Text>
                <View>
                  <IconTextPair
                    text={user?.phoneNumber}
                    icon={<PhoneIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-2 py-1"
                  />
                  <IconTextPair
                    text={user?.email}
                    icon={<MailIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-2 py-1"
                  />
                  <IconTextPair
                    text={user?.address}
                    icon={<AddressIcon />}
                    textTailwindCss="text-base font-medium"
                    containerTailwindCss="gap-2 py-1"
                  />
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={() => alert('personal vehicles')}
                  >
                    <IconTextPair
                      text="Registered vehicles"
                      icon={<VehicleIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 py-1"
                    />
                  </CrossPlatformButtonLayout>
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={onFavoriteWorkshops}
                  >
                    <IconTextPair
                      text="Favorite workshops"
                      icon={<HeartIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 py-1"
                    />
                  </CrossPlatformButtonLayout>
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={() => handleLogout(dispatch, navigation)}
                  >
                    <IconTextPair
                      text="Logout"
                      icon={<HeartIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 py-1"
                    />
                  </CrossPlatformButtonLayout>
                </View>
              </View>
              <HorizontalLine />
              <View className="my-4">
                <Text className="font-medium text-2xl">
                  Payment information
                </Text>
                <View>
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={() => alert('payment methods')}
                  >
                    <IconTextPair
                      text="Payment method"
                      icon={<CreditCardIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 pt-2 pb-1"
                    />
                  </CrossPlatformButtonLayout>
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={() => alert('receipts')}
                  >
                    <IconTextPair
                      text="Receipts"
                      icon={<ReceiptIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 py-1"
                    />
                  </CrossPlatformButtonLayout>
                </View>
              </View>
              <HorizontalLine />
              <View className="my-4">
                <Text className="font-medium text-2xl">Help and support</Text>
                <View>
                  <CrossPlatformButtonLayout
                    removeAllStyles
                    onPress={() => alert('customer support')}
                  >
                    <IconTextPair
                      text="Customer support"
                      icon={<CustomerServiceIcon />}
                      textTailwindCss="text-base font-medium underline"
                      containerTailwindCss="gap-2 pt-2 pb-1"
                    />
                  </CrossPlatformButtonLayout>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
