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
import Star from '../../../assets/svg/star.svg';
import calculateWorkshopStars from '@/utils/workshops/calculateWorkshopStars';
import HorizontalLine from '@/components/ui/HorizontalLine';
import Verified from '../../../assets/svg/verified.svg';
import CarRepair from '../../../assets/svg/servicesIcons/car_repair.svg';
import LocationPin from '../../../assets/svg/location_on.svg';
import CalendarIcon from '../../../assets/svg/free_cancellation.svg';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import IconTextPair from '@/components/ui/IconTextPair';
import PaymentCard from '@/components/ui/payment/PaymentCard';
import {useContext, useEffect, useMemo} from 'react';
import GlobalContext from '@/stateManagement/contexts/GlobalContext';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationReset from '@/services/navigation/reset';
import Workshop from '@/types/workshops/Workshop';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';

export default function ReviewBookingDetailsScreen() {
  const route = useRoute();
  const {workshop, date, time} = route?.params as {
    workshop: Workshop;
    date: string;
    time: string;
  };
  const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  const timeDate = useMemo(() => time + ', ' + date, [date, time]);

  const servicesChoosen = useServicesChoosenByUsers();

  useEffect(() => {
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
          isLoginAvailable={false}
          topContent={
            <Text className="font-semibold text-lg">Review details</Text>
          }
        />
        <ScrollView className="flex-1 m-4" showsVerticalScrollIndicator={false}>
          <View className="border rounded-xl border-slate-200 px-4">
            <View className="flex flex-row my-4">
              {/* to do- spostare le immagini in un componente */}
              <Image
                source={{uri: workshop?.imageUrl}}
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
                  <Text className="text-xl font-semibold">
                    {workshop?.title}
                  </Text>
                  {workshop?.verified && (
                    <Verified width={24} name="verified" />
                  )}
                </View>
                <View style={styles.servicePositionContainer}>
                  <Star
                    width={24}
                    name="location-pin"
                    fill={Colors.light.ticText}
                  />
                  <Text className="text-sm" style={styles.serviceInfo}>
                    {calculateWorkshopStars(workshop?.reviews)} (
                    {workshop?.reviews.length} reviews)
                  </Text>
                </View>
              </View>
            </View>
            <HorizontalLine color={Colors.light.lightGrey} />
            <View className="my-2">
              <IconTextPair
                text={servicesChoosen[0].name}
                icon={<CarRepair width={24} fill={Colors.light.ticText} />}
              />
              <IconTextPair
                text={timeDate}
                icon={<CalendarIcon width={24} fill={Colors.light.ticText} />}
              />
              <IconTextPair
                text={workshop.position}
                icon={<LocationPin width={24} fill={Colors.light.ticText} />}
              />
            </View>
          </View>
          <View className="my-5">
            <Text className="text-tic text-base mb-3">SUB TOTAL</Text>
            <View className="border rounded-xl border-slate-200 p-4">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-sm text-tic">
                  Service ({servicesChoosen[0].name})
                </Text>
                <Text>
                  $
                  {calculateWorkshopDiscount(workshop.price, workshop.discount)}
                </Text>
              </View>
              <View
                style={styles.promoCodeContainer}
                className="mt-3 mb-3 flex flex-row justify-between items-center p-4 rounded-xl border-tic"
              >
                <TextInput placeholder="Promo code" />
                <Pressable>
                  <Text className="text-drive">Apply</Text>
                </Pressable>
              </View>
              <HorizontalLine />
              <View className="mb-3">
                <View className="flex flex-row justify-between items-center my-1">
                  <Text className="text-sm text-tic">Sub total</Text>
                  <Text>
                    $
                    {calculateWorkshopDiscount(
                      workshop.price,
                      workshop.discount,
                    )}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-tic">Tax</Text>
                  <Text>$14</Text>
                </View>
              </View>
              <HorizontalLine />
              <View className="flex flex-row justify-between items-center mt-2">
                <Text className="text-base text-tic">Total</Text>
                <Text className="text-lg font-medium">
                  $
                  {calculateWorkshopDiscount(
                    workshop.price,
                    workshop.discount,
                  ) + 14}
                </Text>
              </View>
            </View>
            <View className="mt-6">
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-tic">PAYMENT METHOD</Text>
                <Pressable onPress={handlePaymentTypeChange}>
                  <Text className="text-drive font-semibold text-sm">
                    Change
                  </Text>
                </Pressable>
              </View>
              <Pressable onPress={handlePaymentTypeChange}>
                <PaymentCard
                  userName={userPaymentInfo?.choosenCard?.cardHolder ?? ''}
                  paymentType={
                    userPaymentInfo?.choosenCard?.paymentType ?? 'Cash'
                  }
                  icon={userPaymentInfo?.choosenCard?.icon}
                  id={userPaymentInfo?.choosenCard?.id ?? 0}
                  optionsVisible={false}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <HorizontalLine />
        <View>
          <View className="flex flex-row justify-between items-center mt-2 px-4">
            <Text className="text-base text-tic">Total</Text>
            <Text className="text-xl font-medium">
              $
              {calculateWorkshopDiscount(workshop.price, workshop.discount) +
                14}
            </Text>
          </View>
          <TicDriveButton
            replace={true}
            toTop={true}
            text="Pay now"
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
  servicePositionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 10,
  },
  serviceInfo: {
    color: Colors.light.placeholderText,
  },
  promoCodeContainer: {
    backgroundColor: '#F4F9F7',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});
