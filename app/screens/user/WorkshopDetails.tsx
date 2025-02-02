import {Colors} from '@/constants/Colors';
import {Image} from '@rneui/themed';
import {useContext} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationPin from '../../../assets/svg/location_on.svg';
import Verified from '../../../assets/svg/verified.svg';
import {Ionicons} from '@expo/vector-icons';
import ClientReviewCards from '@/components/ClientReviewCards';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import UserCalendarModal from '@/components/ui/modals/UserCalendarModal';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import { useAppSelector } from '@/stateManagement/redux/hooks';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';

export default function WorkshopDetails() {
  const workshop = useAppSelector(state => state.workshops.selectedWorkshop)
  const {navigation} = useContext(NavigationContext);
  const {areServicesAvailable} = useAreServicesAvailable();

  const token = useJwtToken();

  return (
    <SafeAreaViewLayout tailwindCss="p-2.5" styles={[styles.container]}>
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
          <>
            <Text className="font-bold text-lg">{workshop.name}</Text>
            {/* todo: if the favorite icon is pressable, make it not pressable if !token */}
            <View className={`${!token && 'opacity-0'}`}>
              {workshop.favourite ? (
                <Icon name="heart" size={30} color="red" />
              ) : (
                <Icon name="heart" size={30} color="white" />
              )}
            </View>
          </>
        )}
      </View>
      {!workshop ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600 text-xl">Workshop not found.</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container} className="flex-1 p-2.5">
              <View className="w-full relative" style={styles.cardContainer}>
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
                <View className="flex-1 flex-row items-center gap-0.5 mt-2">
                  <Text className="text-2xl font-semibold">
                    {workshop.name}
                  </Text>
                  {workshop.verified && <Verified width={24} />}
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-semibold">Location</Text>
                <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <LocationPin width={24} fill={Colors.light.ticText} />
                  <Text className="text-base">{workshop.address}</Text>
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-semibold">What people say</Text>
                {/* <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <Star width={24} fill={Colors.light.ticText} />
                  <Text className="text-base">
                    {workshop.meanStars} ({workshop.numberOfReviews} reviews)
                  </Text>
                </View> */}
                <WorkshopReviewinfo meanStars={workshop.meanStars} numberOfReviews={workshop.numberOfReviews} containerTailwindCss='flex-1 flex-row items-center gap-1' textTailwindCss='text-base'/>
                {/* todo */}
                <ClientReviewCards id={5} />
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
