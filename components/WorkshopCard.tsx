import {memo, useContext} from 'react';
import {Colors} from '@/constants/Colors';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import PinLocationIcon from '@/assets/svg/location/PinLocation.svg';
import GreenCheckIcon from '@/assets/svg/check_green.svg';
import StarIcon from '@/assets/svg/star.svg';
import calculateWorkshopStars from '@/utils/workshops/calculateWorkshopStars';
import Workshop from '@/types/workshops/Workshop';
import IconTextPair from './ui/IconTextPair';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';

function WorkshopCard({workshop}: {workshop: Workshop}) {
  const {areServicesAvailable} = useAreServicesAvailable();
  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );
  const {navigation} = useContext(NavigationContext);

  const handleCardPress = (workshop: Workshop) => {
    navigationPush(navigation, 'WorkshopDetails', {id: workshop.id});
  };

  return (
    <Pressable style={styles.container} onPress={() => handleCardPress(workshop)}>
      <View className="border-2 rounded-2xl" style={styles.cardContainer}>
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
        <View className="mb-1.5 px-3 pb-1 pt-2">
          <IconTextPair
            containerTailwindCss="py-1.5"
            textTailwindCss="text-xl font-semibold"
            text={workshop.title}
            icon={<GreenCheckIcon />}
          />
          <IconTextPair
            containerTailwindCss="py-1.5"
            textTailwindCss="text-sm font-medium underline"
            text="indirizzo"
            icon={<PinLocationIcon />}
          />
          <IconTextPair
            containerTailwindCss="py-1.5"
            textTailwindCss="text-sm font-medium"
            text={`${calculateWorkshopStars(workshop.reviews).toString()}/5 (${workshop.reviews.length} reviews)`}
            icon={<StarIcon />}
          />
        </View>
        {areServicesAvailable && (
          // quando pressed vai a disponibilita
          <Pressable
            className="flex flex-row justify-between items-center border-2 border-grey-light m-2 p-3 mt-0 rounded-lg"
            onPress={() => console.log('pressed')}
          >
            <Text className="text-base font-medium">
              {servicesChoosenByUsers[0].name}
            </Text>
            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-base font-medium">Total</Text>
                <Text className="text-base font-medium">
                  ${' '}
                  {calculateWorkshopDiscount(workshop.price, workshop.discount)}
                </Text>
              </View>
              <Text className="font-medium text-xs text-tic">
                Includes taxes and fees
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
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
    borderColor: Colors.light.lightGrey,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
