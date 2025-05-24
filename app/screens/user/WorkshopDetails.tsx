import {Colors} from '@/constants/Colors';
import {Image} from '@rneui/themed';
import {ActivityIndicator, Share, StyleSheet, Text, View} from 'react-native';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import UserCalendarModal from '@/components/ui/modals/UserCalendarModal';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import GreenCheckIcon from '@/assets/svg/check_green.svg';
import ShareIcon from '@/assets/svg/share/shareIcon.svg';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import SeeAllReviewsCards from '@/components/workshop/reviews/SeeAllReviewsCards';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import axiosClient from '@/services/http/axiosClient';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import EmptyHeartIcon from '@/assets/svg/emotions/EmptyHeart.svg';
import RedHeartIcon from '@/assets/svg/emotions/RedHeart.svg';
import CarPinIcon from '@/assets/svg/vehicles/car3.svg';
import {useTranslation} from 'react-i18next';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import openGoogleMaps from '@/services/map/openGoogleMaps';
import getUserMainImage from '@/utils/files/getUserMainImage';
import getWorkshopWorkingHours from '@/services/http/requests/datetime/getWorkshopWorkingHours';
import {useState, useEffect} from 'react';
import { WorkshopWorkingHours } from '@/types/workshops/WorkshopWorkingHours';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';

export default function WorkshopDetails() {
  const workshop = useAppSelector(state => state.workshops.selectedWorkshop);
  const {areServicesAvailable} = useAreServicesAvailable();
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [workingHours, setWorkingHours] = useState<
    Record<string, WorkshopWorkingHours | null>
  >({});
  const [loadingHours, setLoadingHours] = useState(false);
  const lat = workshop?.latitude || null;
  const lng = workshop?.longitude || null;

  const {setErrorMessage} = useGlobalErrors()

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `🚗✨ Discover ${workshop?.name} on TicDrive! ✨🚗\n
      📍 *Location:* ${workshop?.address}\n
      ⭐ *Rating:* ${workshop?.meanStars?.toFixed(1)} (${workshop?.numberOfReviews} reviews)\n
      💰 ${workshop?.servicePrice ? `**Starting from:** ${workshop?.servicePrice} ${workshop?.currency}` : 'Check out our services!'}${workshop?.discount ? ` 🔥 **Limited-time discount:** ${workshop?.discount}% off!` : ''}\n
      ${workshop?.isVerified ? '✅ *This workshop is verified by TicDrive!* 🔥' : ''}\n
      🔗 *Book now on TicDrive!* ${Constants.expoConfig?.extra?.googleMapsApiKey}`,
      });

      if (result.action === Share.sharedAction) {
        console.log('Content shared');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOnFavoritePress = async () => {
    try {
      await axiosClient.post(
        '/customer/workshops/favorite?workshopId=' + workshop?.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        );
        dispatch(
        setSelectedWorkshop({...workshop, isFavorite: !workshop?.isFavorite}),
        );
       } catch (e) {
      console.error('error while adding/removing a workshop to/from favorite');
    }
  };
  useEffect(() => {
   if (!workshop?.id) return;

     const fetchWorkingHours = async () => {
       setLoadingHours(true);
        console.log('Fetching working hours for workshop:', workshop.id);
         try {
          const res = await getWorkshopWorkingHours(workshop.id);
          console.log('Working hours API response:', res.data);

          const hoursByDay: Record<string, WorkshopWorkingHours | null> = {};
          for (const item of res.data) {
          if (item.dayId >= 1 && item.dayId <= 7) {
          const dayName = daysOfWeek[item.dayId - 1];
          hoursByDay[dayName] = item;
        }
      }

       setWorkingHours(hoursByDay);
     } catch (e: any) {
        setErrorMessage('Failed to load working hours');
      console.error('Working hours fetch error:', e?.response?.data || e.message || e);
    } finally {
      setLoadingHours(false);
    }
  };

  fetchWorkingHours();
}, [workshop?.id]);



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
          <Text className="text-red-600 text-xl">{t('workshops.errors.notFound')}</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container} className="flex-1 p-2.5">
              <View
                className="w-full relative mb-2"
                style={styles.cardContainer}
              >
                {workshop?.images?.length && (
                  <Image
                    source={{uri: getUserMainImage(workshop.images)?.url}}
                    containerStyle={styles.image}
                    PlaceholderContent={
                      <ActivityIndicator
                        size="large"
                        color={Colors.light.bookingsOptionsText}
                      />
                    }
                  />
                )}
                <View className="flex-1 flex-row items-center gap-x-1.5 mt-2">
                  <Text className="text-2xl font-semibold">
                    {workshop.workshopName}
                  </Text>
                  {workshop.isVerified && (
                    <GreenCheckIcon width={24} height={24} />
                  )}
                </View>
                <View className="mt-1">
                  {loadingHours ? (
                    <TicDriveSpinner/>
                  ) : (
                    <View className="flex-row justify-between">
                      {/* Left Column: Monday - Friday */}
                      <View className="flex-1 pr-2">
                        <Text className="font-semibold text-base mb-1">
                          {t('workshops.workingHours.weekdays')}
                        </Text>
                        {[
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                        ].map(day => {
                          const hours = workingHours[day];
                          if (!hours) return null;
                          const formatTime = (time: string) => time.slice(0, 5);
                          const morning =
                            hours.morning?.length === 2
                              ? `${formatTime(hours.morning[0])} - ${formatTime(hours.morning[1])}`
                              : null;
                          const afternoon =
                            hours.afternoon?.length === 2
                              ? `${formatTime(hours.afternoon[0])} - ${formatTime(hours.afternoon[1])}`
                              : null;
                          const time =
                            morning && afternoon
                              ? `${morning}, ${afternoon}`
                              : morning || afternoon || 'Closed';

                          return (
                            <View key={day}>
                              {morning && (
                                <Text className="text-sm text-gray-700">
                                  {morning}
                                </Text>
                              )}
                              {afternoon && (
                                <Text className="text-sm text-gray-700">
                                  {afternoon}
                                </Text>
                              )}
                              {!morning && !afternoon && (
                                <Text className="text-sm text-gray-700">
                                  Closed
                                </Text>
                              )}
                            </View>
                          );
                        })}
                      </View>

                      {/* Right Column: Saturday */}
                      <View className="w-[48%]">
                        <Text className="font-semibold text-base mb-1">
                          {t('workshops.workingHours.saturday')}
                        </Text>
                        {(() => {
                          const hours = workingHours['Saturday'];
                          if (!hours)
                            return (
                              <Text className="text-sm text-gray-700">
                               {t('workshops.workingHours.closed')}
                              </Text>
                            );

                          const morning =
                            hours.morning?.length === 2
                              ? `${hours.morning[0]} - ${hours.morning[1]}`
                              : null;
                          const afternoon =
                            hours.afternoon?.length === 2
                              ? `${hours.afternoon[0]} - ${hours.afternoon[1]}`
                              : null;

                          const time =
                            morning && afternoon
                              ? `${morning}, ${afternoon}`
                              : morning || afternoon || 'Closed';

                          return (
                            <Text className="text-sm text-gray-700">
                              {time}
                            </Text>
                          );
                        })()}
                      </View>
                    </View>
                  )}
                </View>
              </View>

              <View className="mt-2">
                <SeeAllServicesCards
                  workshopId={workshop.id}
                  showSubtitle
                  showCalendarModal
                />
              </View>
              <View className="mt-2">
                <Text className="text-xl font-semibold">{t('location')}</Text>
                <View className="flex-1 flex-row items-center gap-0.5">
                  <CrossPlatformButtonLayout
                    onPress={() =>
                      openGoogleMaps(
                        workshop?.address,
                        workshop?.latitude,
                        workshop?.longitude,
                      )
                    }
                  >
                    <Text className="text-base font-medium underline text-tic">
                      {workshop.address}
                    </Text>
                  </CrossPlatformButtonLayout>
                </View>
                {lat && lng && (
                  <View className="mt-2">
                    {workshop.latitude && workshop.longitude && (
                      <View
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 6},
                          shadowOpacity: 0.35,
                          shadowRadius: 3,
                          elevation: 8,
                          backgroundColor: 'white',
                          borderRadius: 17,
                          overflow: 'visible',
                        }}
                      >
                        <View
                          style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            height: 140,
                          }}
                        >
                          <MapView
                            style={StyleSheet.absoluteFillObject}
                            initialRegion={{
                              latitude: workshop.latitude,
                              longitude: workshop.longitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                          >
                            <Marker
                              coordinate={{
                                latitude: workshop.latitude,
                                longitude: workshop.longitude,
                              }}
                            >
                              <CrossPlatformButtonLayout
                                onPress={() =>
                                  openGoogleMaps(
                                    workshop?.address,
                                    workshop?.latitude,
                                    workshop?.longitude,
                                  )
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
                )}
              </View>
              <View className="mt-2.5">
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
            {areServicesAvailable && (
              <View className="flex-1 flex-col mt-2.5">
                <Text className="text-base" style={styles.startingFrom}>
                  {t('workshops.startingFrom')}
                </Text>
                <View className="flex-row items-center">
                  <View>
                    <Text
                      className={[
                        workshop.discount !== 0 ? 'text-red-500' : '',
                        'font-semibold text-xl mx-1',
                      ].join(' ')}
                    >
                      {workshop.servicePrice}
                    </Text>
                    {workshop.discount !== 0 && (
                      <View style={styles.strikethroughLine} />
                    )}
                  </View>
                  {workshop.discount !== 0 && (
                    <Text className="font-semibold text-xl mx-1">
                      $
                      {calculateWorkshopDiscount(
                        workshop.servicePrice ?? 0,
                        workshop?.discount ?? 0,
                      )}
                    </Text>
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
  cardOptionContainer: {
    borderColor: Colors.light.green.drive,
  },
  startingFrom: {
    color: Colors.light.placeholderText,
  },
});
