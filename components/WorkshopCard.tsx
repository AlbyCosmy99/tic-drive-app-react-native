import {memo, useContext} from 'react';
import {Colors} from '@/constants/Colors';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Image} from 'react-native-elements';
import PinLocationIcon from '@/components/svgs/location/PinLocation';
import GreenCheckIcon from '@/components/svgs/CheckGreen';
import IconTextPair from './ui/IconTextPair';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import WorkshopReviewinfo from './workshop/reviews/WorkshopReviewInfo';
import Workshop from '@/types/workshops/Workshop';

interface WorkshopCardProps {
  workshop: Workshop;
  isServiceDetailsEnabled?: boolean;
  pressableContainerStyle?: StyleProp<ViewStyle>;
  viewContainerStyle?: StyleProp<ViewStyle>;
  iconTextPairsContainerTailwindCss?: string;
  iconTextPairContainerTailwindCss?: string;
  iconTextPairTextTailwindCss?: string;
  imageContainerStyle?: StyleProp<ViewStyle>;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({
  workshop,
  pressableContainerStyle,
  viewContainerStyle,
  iconTextPairsContainerTailwindCss,
  iconTextPairContainerTailwindCss,
  iconTextPairTextTailwindCss,
  imageContainerStyle,
  isServiceDetailsEnabled = true,
}) => {
  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );
  const {navigation} = useContext(NavigationContext);
  const dispatch = useAppDispatch();

  const handleCardPress = (workshop: Workshop) => {
    navigationPush(navigation, 'WorkshopDetails');
    dispatch(setSelectedWorkshop(workshop));
  };

  return (
    <Pressable
      style={[styles.container, pressableContainerStyle]}
      className="flex-1"
      onPress={() => handleCardPress(workshop)}
    >
      <View
        className="border-2 rounded-2xl"
        style={[styles.cardContainer, viewContainerStyle]}
      >
        <Image
          source={{uri: workshop.profileImageUrl}}
          containerStyle={[styles.image, imageContainerStyle]}
          PlaceholderContent={
            <ActivityIndicator
              size="large"
              color={Colors.light.bookingsOptionsText}
            />
          }
        />
        <View
          className={`mb-1.5 px-3 pb-1 pt-2 ${iconTextPairsContainerTailwindCss}`}
        >
          <IconTextPair
            containerTailwindCss={`py-1.5 ${iconTextPairContainerTailwindCss}`}
            textTailwindCss={`text-xl font-semibold ${iconTextPairTextTailwindCss}`}
            text={workshop.name}
            icon={<GreenCheckIcon />}
          />
          <IconTextPair
            containerTailwindCss={`py-1.5 ${iconTextPairContainerTailwindCss}`}
            textTailwindCss={`text-sm font-medium underline ${iconTextPairTextTailwindCss}`}
            text={workshop.address}
            icon={<PinLocationIcon />}
          />
          <WorkshopReviewinfo
            meanStars={workshop?.meanStars}
            numberOfReviews={workshop?.numberOfReviews}
            containerTailwindCss={`py-1.5 ${iconTextPairContainerTailwindCss}`}
            textTailwindCss={`text-sm font-medium underline ${iconTextPairTextTailwindCss}`}
          />
        </View>
        {servicesChoosenByUsers.length > 0 && isServiceDetailsEnabled && (
          // to-do: quando pressed vai a disponibilita
          <Pressable
            className="flex flex-row justify-between items-center border-2 border-grey-light m-2 p-3 mt-0 rounded-lg"
            onPress={() => alert('pressed')}
          >
            <Text className="text-base font-medium">
              {servicesChoosenByUsers[0].title}
            </Text>
            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-base font-medium">Total</Text>
                <Text className="text-base font-medium">
                  {workshop.currency + ' '}
                  {calculateWorkshopDiscount(
                    workshop.servicePrice ?? 0,
                    workshop.discount ?? 0,
                  )}
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
};

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
