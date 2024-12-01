import {memo} from 'react';
import {Colors} from '@/constants/Colors';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationPin from '../assets/svg/location_on.svg';
import Verified from '../assets/svg/verified.svg';
import Star from '../assets/svg/star.svg';
import Acute from '../assets/svg/acute.svg';
import FreeCancellation from '../assets/svg/free_cancellation.svg';
import AssistantDirection from '../assets/svg/assistant_direction';
import CalendarIcon from '../assets/svg/calendar_add_on.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Workshop} from '@/constants/temp/Workshops';
import calculateWorkshopStars from '@/utils/workshops/calculateWorkshopStars';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import TicDriveOptionButton from './ui/buttons/TicDriveOptionButton';

function WorkshopCard({workshop}: {workshop: Workshop}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
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
        {workshop.favourite ? (
          <Icon name="heart" size={30} color="red" style={styles.heartIcon} />
        ) : (
          <Icon name="heart" size={30} color="white" style={styles.heartIcon} />
        )}
        <View style={styles.titleContainer}>
          <Text className='text-xl font-semibold'>{workshop.title}</Text>
          {workshop.verified && <Verified width={24} name="verified" />}
        </View>
        <View style={styles.servicePositionContainer}>
          <LocationPin
            width={24}
            name="location-pin"
            fill={Colors.light.ticText}
          />
          <Text className='text-sm' style={styles.serviceInfo}>{workshop.position}</Text>
        </View>
        <View style={styles.servicePositionContainer}>
          <Star width={24} name="location-pin" fill={Colors.light.ticText} />
          <Text className='text-sm' style={styles.serviceInfo}>
            {calculateWorkshopStars(workshop.reviews)} (
            {workshop.reviews.length} reviews)
          </Text>
        </View>
        <View className='flex flex-row mt-4'>
          <View style={styles.expressServiceContainer}>
            <Acute width={24} />
            <Text style={styles.extraService}>Express service</Text>
          </View>
          {workshop.freeCancellation && (
            <View style={styles.expressServiceContainer}>
              <FreeCancellation width={24} />
              <Text className='text-base'>Free cancellation</Text>
            </View>
          )}
        </View>
        <View style={styles.priceContainer}>
          <View>
            <Text
              className='font-semibold text-xl'
              style={workshop.discount !== 0 && styles.priceWithDiscount}
            >
              {workshop.price}
            </Text>
            {workshop.discount !== 0 && (
              <View style={styles.strikethroughLine} />
            )}
          </View>
          {workshop.discount !== 0 && (
            <Text className='font-semibold text-xl'>
              ${calculateWorkshopDiscount(workshop.price, workshop.discount)}
            </Text>
          )}
        </View>
        <View style={styles.cardOptionsContainer}>
          <TouchableOpacity
            style={styles.cardOptionContainer}
            onPress={() => alert('directions')}
          >
            <AssistantDirection width={24} />
            <Text style={styles.cardOption}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardOptionContainer}
            onPress={() => alert('check availability')}
          >
            <CalendarIcon width={24} />
            <Text style={styles.cardOption}>Check availability</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: Colors.light.green.drive,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  cardOption: {
    fontWeight: '500',
    fontSize: 16,
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    borderBottomColor: Colors.light.lightGrey,
    borderBottomWidth: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 15,
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 25,
    zIndex: 1,
  },
  servicePositionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 8,
  },
  serviceInfo: {
    color: Colors.light.placeholderText,
  },
  expressServiceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  extraService: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  strikethroughLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'red',
  },
  priceWithDiscount: {
    color: 'red',
  },
  cardOptionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 15,
  },
});

export default memo(WorkshopCard);
