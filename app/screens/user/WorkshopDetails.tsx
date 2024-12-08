import {Colors} from '@/constants/Colors';
import workshops, {Workshop} from '@/constants/temp/Workshops';
import {Image} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationPin from '../../../assets/svg/location_on.svg';
import Verified from '../../../assets/svg/verified.svg';
import Star from '../../../assets/svg/star.svg';
import Acute from '../../../assets/svg/acute.svg';
import FreeCancellation from '../../../assets/svg/free_cancellation.svg';
import CalendarIcon from '../../../assets/svg/calendar_add_on.svg';
import ChatIcon from '../../../assets/svg/chat.svg';
import {Ionicons} from '@expo/vector-icons';
import ClientReviewCards from '@/components/ClientReviewCards';
import calculateWorkshopStars from '@/utils/workshops/calculateWorkshopStars';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {useRoute} from '@react-navigation/native';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import AssistantDirection from '../../../assets/svg/assistant_direction';
import TicDriveOptionButton from '@/components/ui/buttons/TicDriveOptionButton';
import UserCalendarModal from '@/components/ui/modals/UserCalendarModal';

export default function WorkshopDetails() {
  const route = useRoute();
  //@ts-ignore
  const {id} = route?.params;
  const {navigation} = useContext(NavigationContext);

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const servicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );

  useEffect(() => {
    setWorkshop(workshops.find(workshop => workshop.id === id) || null);
  }, [id]);

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
                  <Text className="text-2xl font-semibold">
                    {workshop.title}
                  </Text>
                  {workshop.verified && <Verified width={24} />}
                </View>
                <View className="flex-1 flex-row mt-2.5">
                  <View className="flex-1 flex-row items-center gap-0.5">
                    <Acute width={24} />
                    <Text className="text-base">Express service</Text>
                  </View>
                  {workshop.freeCancellation && (
                    <View className="flex-1 flex-row items-center gap-0.5">
                      <FreeCancellation width={24} />
                      <Text className="text-base">Free cancellation</Text>
                    </View>
                  )}
                </View>
                <View className="flex-1 flex-row gap-2.5 mt-2.5 mb-3.5 flex-wrap">
                  <TicDriveOptionButton
                    text="Directions"
                    icon={<AssistantDirection width={24} />}
                    containerTailwindCss="gap-0.5"
                  />
                  <TicDriveOptionButton
                    text="Check availability"
                    icon={<CalendarIcon width={24} />}
                    containerTailwindCss="gap-0.5"
                  />
                  <TicDriveOptionButton
                    text="Message"
                    icon={<ChatIcon width={24} />}
                    containerTailwindCss="gap-0.5"
                  />
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-semibold">Location</Text>
                <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <LocationPin width={24} fill={Colors.light.ticText} />
                  <Text className="text-base">{workshop.position}</Text>
                </View>
              </View>
              <View className="mt-2.5">
                <Text className="text-xl font-semibold">What people say</Text>
                <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                  <Star width={24} fill={Colors.light.ticText} />
                  <Text className="text-base">
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
                    {workshop.price}
                  </Text>
                  {workshop.discount !== 0 && (
                    <View style={styles.strikethroughLine} />
                  )}
                </View>
                {workshop.discount !== 0 && (
                  <Text className="font-semibold text-xl mx-1">
                    $
                    {calculateWorkshopDiscount(
                      workshop.price,
                      workshop.discount,
                    )}
                  </Text>
                )}
              </View>
            </View>
            <View className="flex justify-center items-center">
              {servicesChoosen.length > 0 && (
                <UserCalendarModal workshop={workshop} />
              )}
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
