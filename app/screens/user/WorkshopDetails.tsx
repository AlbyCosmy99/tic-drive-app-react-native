import {Colors} from '@/constants/Colors';
import {Image} from '@rneui/themed';
import {useContext, useRef} from 'react';
import {ActivityIndicator, Share, StyleSheet, Text, View} from 'react-native';
import {
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Ionicons} from '@expo/vector-icons';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import UserCalendarModal from '@/components/ui/modals/UserCalendarModal';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import GreenCheckIcon from '@/assets/svg/check_green.svg';
import IconTextPair from '@/components/ui/IconTextPair';
import ShareIcon from '@/assets/svg/share/shareIcon.svg';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import SeeAllReviewsCards from '@/components/workshop/reviews/SeeAllReviewsCards';

export default function WorkshopDetails() {
  const workshop = useAppSelector(state => state.workshops.selectedWorkshop);
  const {navigation} = useContext(NavigationContext);
  const {areServicesAvailable} = useAreServicesAvailable();
  const token = useJwtToken();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `🚗✨ Discover ${workshop?.name} on TicDrive! ✨🚗\n
      📍 *Location:* ${workshop?.address}\n
      ⭐ *Rating:* ${workshop?.meanStars?.toFixed(1)} (${workshop?.numberOfReviews} reviews)\n
      💰 ${workshop?.servicePrice ? `**Starting from:** ${workshop?.servicePrice} ${workshop?.currency}` : 'Check out our services!'}${workshop?.discount ? ` 🔥 **Limited-time discount:** ${workshop?.discount}% off!` : ''}\n
      ${workshop?.isVerified ? '✅ *This workshop is verified by TicDrive!* 🔥' : ''}\n
      🔗 *Book now on TicDrive!*`,
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

  return (
    <SafeAreaViewLayout tailwindCss="p-2.5" styles={[styles.container]}>
      {/* custom navbar */}
      <View className="flex-row items-center justify-between mr-2.5">
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          className="m-2 mb-2.5"
          accessible={true}
          accessibilityLabel="Back to previous page"
        >
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        {workshop && (
          <IconTextPair
            text={workshop.name}
            icon={
              workshop.isVerified && <GreenCheckIcon width={22} height={22} />
            }
            reverseIcon
            containerTailwindCss="flex flex-row justify-center items-center gap-x-1.5"
            textTailwindCss="font-semibold text-lg"
          />
        )}
        <View className="flex flex-row gap-x-4 justify-center items-center">
          {workshop && (
            <View className={`${!token && 'opacity-0'}`}>
              {workshop.favourite ? (
                <Icon name="heart" size={22} color="red" />
              ) : (
                <Icon name="heart" size={22} color="red" />
              )}
            </View>
          )}
          <Pressable onPress={onShare}>
            <ShareIcon />
          </Pressable>
        </View>
      </View>
      {!workshop ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600 text-xl">Workshop not found.</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container} className="flex-1 p-2.5">
              <View
                className="w-full relative mb-2"
                style={styles.cardContainer}
              >
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
                <View className="flex-1 flex-row items-center gap-x-1.5 mt-2">
                  <Text className="text-2xl font-semibold">
                    {workshop.name}
                  </Text>
                  {workshop.isVerified && (
                    <GreenCheckIcon width={24} height={24} />
                  )}
                </View>
              </View>

              <View className="mt-2">
                <SeeAllServicesCards workshopId={workshop.id} showSubtitle />
              </View>
              <View className="mt-2">
                <Text className="text-xl font-semibold">Location</Text>
                <View className="flex-1 flex-row items-center gap-0.5">
                  <Text className="text-base font-medium underline text-tic">
                    {workshop.address}
                  </Text>
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-semibold">What people say</Text>
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
                  Starting from
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
              <UserCalendarModal />
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
