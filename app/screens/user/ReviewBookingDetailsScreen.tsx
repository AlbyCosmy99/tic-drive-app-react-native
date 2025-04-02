import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {useRoute} from '@react-navigation/native';
import {Image} from '@rneui/themed';
import {ActivityIndicator} from 'react-native';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Verified from '../../../assets/svg/verified.svg';
import CarRepair from '../../../assets/svg/servicesIcons/car_repair.svg';
import LocationPin from '../../../assets/svg/location_on.svg';
import CalendarIcon from '../../../assets/svg/free_cancellation.svg';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import IconTextPair from '@/components/ui/IconTextPair';
import PaymentCard from '@/components/ui/payment/PaymentCard';
import {useContext, useEffect, useMemo} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationReset from '@/services/navigation/reset';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import CashIcon from '@/assets/svg/payment/cash.svg';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import openGoogleMaps from '@/services/map/openGoogleMaps';

export default function ReviewBookingDetailsScreen() {
  const route = useRoute();
  const {date, time} = route?.params as {
    date: string;
    time: string;
  };
  const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  const timeDate = useMemo(() => time + ', ' + date, [date, time]);

  const servicesChoosen = useServicesChoosenByUsers();
  const workshop = useAppSelector(state => state.workshops.selectedWorkshop);

  useEffect(() => {
    console.log(workshop);
    if (!userPaymentInfo?.choosenCard) {
      setUserPaymentInfo({
        ...userPaymentInfo,
        choosenCard: isAndroidPlatform()
          ? userPaymentInfo?.defaultPaymentTypes.find(
              type => type.paymentType === 'Google Pay',
            )
          : userPaymentInfo?.defaultPaymentTypes.find(
              type => type.paymentType === 'Apple Pay',
            ),
      });
    }
  }, []);

  const handlePaymentTypeChange = () => {
    navigationPush(navigation, 'PaymentCardsScreen');
  };

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
    >
      <SafeAreaViewLayout styles={[styles.container]}>
        <TicDriveNavbar
          topContent={
            <Text className="font-semibold text-lg">Review details</Text>
          }
        />
        <ScrollView
          className="flex-1 mx-4 my-0 mb-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="border rounded-xl border-slate-200 px-4">
            <View className="flex flex-row my-4">
              {/* to do- spostare le immagini in un componente */}
              <Image
                source={{uri: workshop?.profileImageUrl}}
                containerStyle={styles.image}
                PlaceholderContent={
                  <ActivityIndicator
                    size="large"
                    color={Colors.light.bookingsOptionsText}
                  />
                }
              />
              <View>
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-xl font-medium">{workshop?.name}</Text>
                  {workshop?.isVerified && (
                    <Verified width={24} name="verified" />
                  )}
                </View>
                <WorkshopReviewinfo
                  meanStars={workshop?.meanStars}
                  numberOfReviews={workshop?.numberOfReviews}
                  textTailwindCss="text-tic"
                  containerTailwindCss="gap-1"
                />
              </View>
            </View>
            <HorizontalLine color={Colors.light.lightGrey} />
            <View>
              <IconTextPair
                text={servicesChoosen[0].title}
                icon={<CarRepair width={16} fill={Colors.light.ticText} />}
              />
              <IconTextPair
                text={timeDate}
                icon={<CalendarIcon width={16} fill={Colors.light.ticText} />}
              />
              <CrossPlatformButtonLayout
                removeAllStyles
                onPress={() =>
                  openGoogleMaps(
                    workshop?.address ?? '',
                    workshop?.latitude ?? 0,
                    workshop?.longitude ?? 0,
                  )
                }
              >
                <IconTextPair
                  text={workshop?.address}
                  textTailwindCss="underline text-tic"
                  icon={<LocationPin width={16} fill={Colors.light.ticText} />}
                />
              </CrossPlatformButtonLayout>
            </View>
          </View>
          <View className="my-3">
            <Text className="text-tic text-sm font-medium mb-3">SUBTOTAL</Text>
            <View className="border rounded-xl border-slate-200 p-4">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-sm text-tic">
                  Service ({servicesChoosen[0].title})
                </Text>
                <Text>
                  $
                  {calculateWorkshopDiscount(
                    workshop?.servicePrice ?? 0,
                    workshop?.discount ?? 0,
                  )}
                </Text>
              </View>
              <View
                style={styles.promoCodeContainer}
                className="mt-3 mb-3 flex flex-row justify-between items-center p-4 rounded-xl border-tic"
              >
                <TextInput placeholder="Promo code" style={{flex: 1}} />
                <Pressable>
                  <Text className="text-drive">Apply</Text>
                </Pressable>
              </View>
              <HorizontalLine />
              <View className="flex flex-row justify-between items-center mt-2">
                <Text className="text-base text-tic">Total</Text>
                <Text className="text-lg font-medium">
                  $
                  {calculateWorkshopDiscount(
                    workshop?.servicePrice ?? 0,
                    workshop?.discount ?? 0,
                  ) + 14}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View className="flex flex-row justify-between items-center mb-3">
              <Text className="text-tic text-sm font-medium">
                PAYMENT METHOD
              </Text>
              {/* todo: da rimettere appena si abilita la possibilita di pagare in app */}
              {/* <Pressable onPress={handlePaymentTypeChange}>
                <Text className="text-drive font-semibold text-sm">Change</Text>
              </Pressable> */}
            </View>
            <PaymentCard
              userName={userPaymentInfo?.choosenCard?.cardHolder ?? ''}
              paymentType={'Pay in the workshop'}
              icon={<CashIcon width={24} fill={Colors.light.ticText} />}
              //todo: da rimettere appena si abilita la possibilita di pagare in app
              // icon={userPaymentInfo?.choosenCard?.icon}
              id={userPaymentInfo?.choosenCard?.id ?? 0}
              optionsVisible={false}
            />
            {/* todo: da attivare quando si permettono i pagamenti in app */}
            {/* <Pressable onPress={handlePaymentTypeChange}>
              <PaymentCard
                userName={userPaymentInfo?.choosenCard?.cardHolder ?? ''}
                paymentType={
                  userPaymentInfo?.choosenCard?.paymentType ?? 'Cash'
                }
                icon={userPaymentInfo?.choosenCard?.icon}
                id={userPaymentInfo?.choosenCard?.id ?? 0}
                optionsVisible={false}
              />
            </Pressable> */}
          </View>
        </ScrollView>
        <HorizontalLine />
        <View>
          <View className="flex flex-row justify-between items-center mt-2 px-4">
            <Text className="text-base text-tic">Total</Text>
            <Text className="text-xl font-medium">
              $
              {calculateWorkshopDiscount(
                workshop?.servicePrice ?? 0,
                workshop?.discount ?? 0,
              ) + 14}
            </Text>
          </View>
          <TicDriveButton
            replace={true}
            toTop={true}
            text="Book now"
            routeName="userTabs"
            routeParams={{animation: 'fade'}}
            stateRouteName="Home"
            onClick={() => {
              navigationReset(navigation, 0, 'BookingConfirmationScreen', {
                workshop,
                date,
                time,
              });
            }}
          />
        </View>
      </SafeAreaViewLayout>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  success: {
    color: Colors.light.ticText,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  promoCodeContainer: {
    backgroundColor: '#F4F9F7',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});
