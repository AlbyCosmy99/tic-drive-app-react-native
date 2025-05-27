import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import GreenCheckIcon from '@/assets/svg/check_green.svg';
import EmptyHeartIcon from '@/assets/svg/emotions/EmptyHeart.svg';
import RedHeartIcon from '@/assets/svg/emotions/RedHeart.svg';
import ShareIcon from '@/assets/svg/share/shareIcon.svg';
import CarPinIcon from '@/assets/svg/vehicles/car3.svg';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import UserCalendarModal from '@/components/ui/modals/UserCalendarModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import SeeAllReviewsCards from '@/components/workshop/reviews/SeeAllReviewsCards';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import {Colors} from '@/constants/Colors';
import daysOfWeek from '@/constants/datetime/daysOfWeek';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import axiosClient from '@/services/http/axiosClient';
import getWorkshopWorkingHours from '@/services/http/requests/datetime/getWorkshopWorkingHours';
import openGoogleMaps from '@/services/map/openGoogleMaps';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {setWorkshop} from '@/stateManagement/redux/slices/bookingSlice';
import {WorkshopWorkingHours} from '@/types/workshops/WorkshopWorkingHours';
import formatPrice from '@/utils/currency/formatPrice.';
import getUserMainImage from '@/utils/files/getUserMainImage';
import {Image} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Share, StyleSheet} from 'react-native';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';

export default function WorkshopDetailsScreen() {
  const workshop = useAppSelector(state => state.booking.workshop);
  const serviceChoosen = useServiceChoosenByCustomer();
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {setErrorMessage} = useGlobalErrors();

  const [workingHours, setWorkingHours] = useState<
    Record<string, WorkshopWorkingHours | null>
  >({});
  const [loadingHours, setLoadingHours] = useState(false);



  const formatTime = (time: string) => time.slice(0, 5);

  const getTimeLabel = (
    hours: WorkshopWorkingHours | null,
  ): {morning: string | null; afternoon: string | null} => {
    if (!hours) return {morning: null, afternoon: null};
    const morning =
      Array.isArray(hours.morning) && hours.morning[0] && hours.morning[1]
        ? `${formatTime(hours.morning[0])}–${formatTime(hours.morning[1])}`
        : null;
    const afternoon =
      Array.isArray(hours.afternoon) && hours.afternoon[0] && hours.afternoon[1]
        ? `${formatTime(hours.afternoon[0])}–${formatTime(hours.afternoon[1])}`
        : null;
    return {morning, afternoon};
  };

  const groupDaysByTime = (
    workingHours: Record<string, WorkshopWorkingHours | null>,
  ) => {
    const hashMap = new Map<
      string,
      {days: string[]; morning: string | null; afternoon: string | null}
    >();

    for (const day of daysOfWeek) {
      const {morning, afternoon} = getTimeLabel(workingHours[day] || null);
      const key = `${morning ?? 'null'}|${afternoon ?? 'null'}`;
      if (hashMap.has(key)) {
        hashMap.get(key)!.days.push(day);
      } else {
        hashMap.set(key, {days: [day], morning, afternoon});
      }
    }

    return Array.from(hashMap.values());
  };

  const formatDayRange = (days: string[], t: (key: string) => string) => {
    if (days.length === 1) return t(`days.${days[0]}`);
    return `${t(`days.${days[0]}`)}–${t(`days.${days[days.length - 1]}`)}`;
  };

  const handleOnFavoritePress = async () => {
    try {
      await axiosClient.post(
        `/customer/workshops/favorite?workshopId=${workshop?.id}`,
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      dispatch(setWorkshop({...workshop, isFavorite: !workshop?.isFavorite}));
    } catch (e) {
      console.error('Error while toggling favorite workshop');
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `🚗✨ Discover ${workshop?.workshopName} on TicDrive! ✨🚗\n\n📍 Location: ${workshop?.address}\n⭐ Rating: ${workshop?.meanStars?.toFixed(1)} (${workshop?.numberOfReviews} reviews)\n💰 ${workshop?.servicePrice ? `Starting from: ${formatPrice(workshop?.servicePrice, workshop.discount ?? 0)} ${workshop?.currency}` : 'Check out our services!'}${workshop?.discount ? ` 🔥 ${workshop?.discount}% discount!` : ''}\n\n${workshop?.isVerified ? '✅ Verified by TicDrive' : ''}`,
      });
      if (result.action === Share.dismissedAction)
        console.log('Share dismissed');
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  useEffect(() => {
    if (!workshop?.id) return;

    const fetchWorkingHours = async () => {
      setLoadingHours(true);
      try {
        const res = await getWorkshopWorkingHours(workshop.id);
        const hoursByDay: Record<string, WorkshopWorkingHours | null> = {};
        for (let i = 0; i < 7; i++) hoursByDay[daysOfWeek[i]] = null;
        for (const item of res.data) {
          if (item.dayId >= 1 && item.dayId <= 7) {
            hoursByDay[daysOfWeek[item.dayId - 1]] = item;
          }
        }
        setWorkingHours(hoursByDay);
      } catch (e: any) {
        setErrorMessage('Failed to load working hours');
        console.error('Error fetching working hours:', e);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchWorkingHours();
  }, [workshop?.id]);

  const lat = workshop?.latitude;
  const lng = workshop?.longitude;

  return (
    <SafeAreaViewLayout styles={[styles.container]}>
      <TicDriveNavbar
        rightContent={
          <View className="flex flex-row gap-x-4 justify-center items-center">
            {workshop && token && (
              <CrossPlatformButtonLayout onPress={handleOnFavoritePress}>
                <View
                  className={`${!token && 'opacity-0'} w-6 h-6 p-6 pr-4 justify-center items-center`}
                >
                  {workshop.isFavorite ? <RedHeartIcon /> : <EmptyHeartIcon />}
                </View>
              </CrossPlatformButtonLayout>
            )}
            <Pressable onPress={onShare}>
              <ShareIcon />
            </Pressable>
          </View>
        }
      />

      {!workshop ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600 text-xl">
            {t('workshops.errors.notFound')}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container} className="flex-1 p-2.5">
              <View
                className="w-full relative mb-2"
                style={styles.cardContainer}
              >
                {workshop?.images?.length > 0 && (
                  <Image
                    source={{uri: getUserMainImage(workshop.images)?.url}}
                    containerStyle={styles.image}
                    PlaceholderContent={<TicDriveSpinner />}
                  />
                )}
                <View className="flex-row items-center gap-x-1.5 mt-2">
                  <Text className="text-2xl font-semibold">
                    {workshop.workshopName}
                  </Text>
                  {workshop.isVerified && (
                    <GreenCheckIcon width={24} height={24} />
                  )}
                </View>

                <View className="mt-2">
                  {loadingHours ? (
                    <View className='h-20'>
                      <TicDriveSpinner />
                    </View>
                  ) : (
                    <View className="flex-row flex-wrap justify-between gap-y-2">
                      {groupDaysByTime(workingHours).map((group, index) => (
                        <View key={index} className="w-[48%] px-2">
                          <Text className="text-sm font-medium text-gray-700">
                            {formatDayRange(group.days, t)}
                          </Text>
                          {group.morning && (
                            <Text className="text-sm text-gray-600">
                              {group.morning}
                            </Text>
                          )}
                          {group.afternoon && (
                            <Text className="text-sm text-gray-600">
                              {group.afternoon}
                            </Text>
                          )}
                          {!group.morning && !group.afternoon && (
                            <Text className="text-sm text-gray-600">
                              {t('workshops.workingHours.closed')}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <SeeAllServicesCards
                workshopId={workshop.id}
                showSubtitle
                showCalendarModal
              />

              <View className="mt-2">
                <Text className="text-xl font-semibold">{t('location')}</Text>
                <CrossPlatformButtonLayout
                  onPress={() => openGoogleMaps(workshop.address, lat, lng)}
                >
                  <Text className="text-base font-medium underline text-tic">
                    {workshop.address}
                  </Text>
                </CrossPlatformButtonLayout>
                {lat && lng && (
                  <View
                    className="mt-2"
                    style={{
                      elevation: 6,
                      backgroundColor: 'white',
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{borderRadius: 8, overflow: 'hidden', height: 140}}
                    >
                      <MapView
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={{
                          latitude: lat,
                          longitude: lng,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                      >
                        <Marker coordinate={{latitude: lat, longitude: lng}}>
                          <CrossPlatformButtonLayout
                            onPress={() =>
                              openGoogleMaps(workshop.address, lat, lng)
                            }
                          >
                            <CarPinIcon />
                          </CrossPlatformButtonLayout>
                        </Marker>
                      </MapView>
                    </View>
                  </View>
                )}
              </View>

              <View className="mt-3.5">
                <Text className="text-xl font-semibold">
                  {t('workshops.reviews.whatPeopleSay')}
                </Text>
                <WorkshopReviewinfo
                  meanStars={workshop.meanStars}
                  numberOfReviews={workshop.numberOfReviews}
                  containerTailwindCss="flex-1 flex-row items-center gap-x-1"
                  textTailwindCss="text-base font-medium"
                />
                <SeeAllReviewsCards workshopId={workshop.id} />
              </View>
            </View>
          </ScrollView>

          <View
            style={styles.bottom}
            className="flex-row justify-between items-center mx-2.5 border-t"
          >
            {serviceChoosen && workshop.servicePrice && (
              <View className="flex-1 flex-col mt-2.5">
                <Text className="text-base" style={styles.startingFrom}>
                  {t('workshops.startingFrom')}
                </Text>
                <View className="flex-row items-center">
                  <Text
                    className={[
                      workshop.discount !== 0 ? 'text-red-500' : '',
                      'font-semibold text-xl mx-1',
                    ].join(' ')}
                  >
                    {workshop.currency + formatPrice(workshop.servicePrice)}
                  </Text>
                  {workshop.discount !== 0 && (
                    <>
                      <View style={styles.strikethroughLine} />
                      <Text className="font-semibold text-xl mx-1">
                        {workshop.currency}
                        {formatPrice(workshop.servicePrice, workshop.discount)}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            )}
            <View className="flex justify-center items-center flex-1">
              <UserCalendarModal workshopId={workshop.id} />
            </View>
          </View>
        </>
      )}
    </SafeAreaViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  bottom: {
    borderTopColor: Colors.light.extremelyLightGrey,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardContainer: {
    borderBottomColor: Colors.light.extremelyLightGrey,
  },
  strikethroughLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: 'red',
  },
  startingFrom: {
    color: Colors.light.placeholderText,
  },
});
