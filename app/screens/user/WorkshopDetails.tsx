import {Colors} from '@/constants/Colors';
import workshops, {Workshop} from '@/constants/temp/Workshops';
import {Image} from '@rneui/themed';
import {router, useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationPin from '../../../assets/svg/location_on.svg';
import Verified from '../../../assets/svg/verified.svg';
import Star from '../../../assets/svg/star.svg';
import Acute from '../../../assets/svg/acute.svg';
import FreeCancellation from '../../../assets/svg/free_cancellation.svg';
import AssistantDirection from '../../../assets/svg/assistant_direction';
import CalendarIcon from '../../../assets/svg/calendar_add_on.svg';
import ChatIcon from '../../../assets/svg/chat.svg';
import {Ionicons} from '@expo/vector-icons';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import ClientReviewCards from '@/components/ClientReviewCards';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import calculateWorkshopStars from '@/utils/workshops/calculateWorkshopStars';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import { globalStyles } from '@/styles/globalStyles';
import { useAppSelector } from '@/stateManagement/redux/hooks';

export default function WorkshopDetails() {
  const {id} = useLocalSearchParams();

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const servicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  useEffect(() => {
    setWorkshop(workshops.find(workshop => String(workshop.id) === id) || null);
  }, [id]);

  return (
    <SafeAreaView
      style={[styles.container, globalStyles().safeAreaView]}
      className={`flex-1 p-2.5 ${necessaryDeviceBottomInset()}`}
    >
      <View className="flex-row items-center justify-between mr-2.5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="m-2 mb-2.5"
          accessible={true}
          accessibilityLabel="Back to previous page"
        >
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        {workshop && (
          <>
            <Text className="font-bold text-lg">Workshop</Text>
            <View>
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
              <View
                className="w-full relative border-b-2"
                style={styles.cardContainer}
              >
                <Image
                  source={{uri: workshop.imageUrl}}
                  containerStyle={styles.image}
                  PlaceholderContent={
                    <ActivityIndicator
                      size="large"
                      color={Colors.light.bookingsOptionsText}
                    />
                  }
                />
                <View className="flex-1 flex-row items-center gap-0.5 mt-2">
                  <Text className="text-2xl font-bold">{workshop.title}</Text>
                  {workshop.verified && <Verified width={24} />}
                </View>
                <View className="flex-1 flex-row mt-2.5">
                  <View className="flex-1 flex-row items-center gap-0.5">
                    <Acute width={24} />
                    <Text className="text-lg">Express service</Text>
                  </View>
                  {workshop.freeCancellation && (
                    <View className="flex-1 flex-row items-center gap-0.5">
                      <FreeCancellation width={24} />
                      <Text className="text-lg">Free cancellation</Text>
                    </View>
                  )}
                </View>
                <View className="flex-1 flex-row gap-2.5 mt-2.5 mb-3.5 flex-wrap">
                  <TouchableOpacity
                    className="flex-row items-center gap-0.5 border px-2.5 py-1.5 rounded-3xl"
                    style={styles.cardOptionContainer}
                    onPress={() => alert('directions')}
                    accessible={true}
                    accessibilityLabel="Map directions"
                  >
                    <AssistantDirection width={24} />
                    <Text className="font-medium text-base">Directions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row items-center gap-0.5 border px-2.5 py-1.5 rounded-3xl"
                    style={styles.cardOptionContainer}
                    onPress={() => alert('check availability')}
                    accessible={true}
                    accessibilityLabel="Check availability"
                  >
                    <CalendarIcon width={24} />
                    <Text className="font-medium text-base">
                      Check availability
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row items-center gap-0.5 border px-2.5 py-1.5 rounded-3xl"
                    style={styles.cardOptionContainer}
                    onPress={() => alert('message')}
                    accessible={true}
                    accessibilityLabel="Message"
                  >
                    <ChatIcon width={24} />
                    <Text className="font-medium text-base">Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-bold">Location</Text>
                <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <LocationPin width={24} fill={Colors.light.ticText} />
                  <Text className="text-lg">{workshop.position}</Text>
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-bold">What people say</Text>
                <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <Star width={24} fill={Colors.light.ticText} />
                  <Text className="text-lg">
                    {calculateWorkshopStars(workshop.reviews)} (
                    {workshop.reviews.length} reviews)
                  </Text>
                </View>
                <ClientReviewCards id={Array.isArray(id) ? id[0] : id} />
              </View>
            </View>
          </ScrollView>
          <View
            style={styles.bottom}
            className="flex-row justify-between items-center mx-2.5 border-t"
          >
            <View className="flex-1 flex-col mt-2.5">
              <Text className="text-lg" style={styles.startingFrom}>
                Starting from
              </Text>
              <View className="flex-row items-center">
                <View>
                  <Text
                    className={[
                      workshop.discount !== 0 ? 'text-red-500' : '',
                      'font-bold text-2xl mx-1',
                    ].join(' ')}
                  >
                    {workshop.price}
                  </Text>
                  {workshop.discount !== 0 && (
                    <View style={styles.strikethroughLine} />
                  )}
                </View>
                {workshop.discount !== 0 && (
                  <Text className="font-bold text-2xl mx-1">
                    $
                    {calculateWorkshopDiscount(
                      workshop.price,
                      workshop.discount,
                    )}
                  </Text>
                )}
              </View>
            </View>
            <View>
              {servicesChoosen.length > 0 && (
                <TicDriveButton
                  text="Book a service"
                  path={'../../screens/user/CalendarDateSelectionScreen'}
                  customButtonStyle={styles.customButtonStyle}
                />
              )}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  bottom: {
    borderTopColor: Colors.light.SegmentedControlBackground,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardContainer: {
    borderBottomColor: Colors.light.SegmentedControlBackground,
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
  customButtonStyle: {
    height: 50,
  },
});
