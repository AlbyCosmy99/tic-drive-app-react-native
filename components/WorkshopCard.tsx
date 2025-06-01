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
import PinLocationIcon from '@/assets/svg/location/PinLocation.svg';
import GreenCheckIcon from '@/assets/svg/check_green.svg';
import IconTextPair from './ui/IconTextPair';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import WorkshopReviewinfo from './workshop/reviews/WorkshopReviewInfo';
import Workshop from '@/types/workshops/Workshop';
import getUserMainImage from '@/utils/files/getUserMainImage';
import CrossPlatformButtonLayout from './ui/buttons/CrossPlatformButtonLayout';
import isScreenSmall from '@/services/responsive/isScreenSmall';
import {useTranslation} from 'react-i18next';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import {setWorkshop} from '@/stateManagement/redux/slices/bookingSlice';
import formatPrice from '@/utils/currency/formatPrice.';
import getFullServiceName from '@/services/toString/getFullServiceName';

interface WorkshopCardProps {
  workshop: Workshop;
  isServiceDetailsEnabled?: boolean;
  pressableContainerStyle?: StyleProp<ViewStyle>;
  viewContainerStyle?: StyleProp<ViewStyle>;
  iconTextPairsContainerTailwindCss?: string;
  iconTextPairContainerTailwindCss?: string;
  iconTextPairTextTailwindCss?: string;
  imageContainerStyle?: StyleProp<ViewStyle>;
  titleTextTailwindCss?: string;
  addressContainerTailwindCss?: string;
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
  titleTextTailwindCss,
  addressContainerTailwindCss,
}) => {
  const servicesChoosen = useServiceChoosenByCustomer();
  const {navigation} = useContext(NavigationContext);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleCardPress = (workshop: Workshop) => {
    navigationPush(navigation, 'WorkshopDetailsScreen');
    dispatch(setWorkshop(workshop));
  };

  const workshopNameTextSize = isScreenSmall() ? 'text-lg' : 'text-xl';

  return (
    <Pressable
      style={[styles.container, pressableContainerStyle]}
      className="flex-1"
      onPress={() => handleCardPress(workshop)}
    >
      <View
        className="border-2 rounded-2xl"
        style={[
          styles.cardContainer,
          viewContainerStyle,
          {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 0.17,
            shadowRadius: 5,
            elevation: 8,
            backgroundColor: 'white',
          },
        ]}
      >
        {workshop.images?.length && (
          <Image
            source={{uri: getUserMainImage(workshop.images)?.url}}
            containerStyle={[styles.image, imageContainerStyle]}
            PlaceholderContent={
              <ActivityIndicator
                size="large"
                color={Colors.light.bookingsOptionsText}
              />
            }
          />
        )}
        <View
          className={`mb-1.5 px-3 pb-1 pt-2 ${iconTextPairsContainerTailwindCss}`}
        >
          <IconTextPair
            containerTailwindCss={`${isScreenSmall() ? 'py-1' : 'py-1.5'} pr-1 ${iconTextPairContainerTailwindCss}`}
            textTailwindCss={`${workshopNameTextSize} font-semibold ${iconTextPairTextTailwindCss} ${titleTextTailwindCss}`}
            text={workshop.workshopName}
            icon={<GreenCheckIcon />}
            textProps={{allowFontScaling: false}}
          />

          <IconTextPair
            containerTailwindCss={`${isScreenSmall() ? 'py-1' : 'py-1.5'} pr-5 ${iconTextPairContainerTailwindCss} ${addressContainerTailwindCss}`}
            textTailwindCss={`text-sm font-medium underline ${iconTextPairTextTailwindCss}`}
            text={workshop.address}
            icon={<PinLocationIcon />}
            textProps={{allowFontScaling: false}}
          />

          <WorkshopReviewinfo
            meanStars={workshop?.meanStars}
            numberOfReviews={workshop?.numberOfReviews}
            containerTailwindCss={`${isScreenSmall() ? 'py-1' : 'py-1.5'} ${iconTextPairContainerTailwindCss}`}
            textTailwindCss={`text-sm font-medium underline ${iconTextPairTextTailwindCss}`}
            textProps={{allowFontScaling: false}}
          />
        </View>

        {servicesChoosen?.length > 0 && isServiceDetailsEnabled && (
          <CrossPlatformButtonLayout
            buttonTailwindCss="flex-row justify-between items-center border-2 border-grey-light m-2 p-3 mt-0 rounded-lg"
            onPress={() => alert('pressed')}
          >
            <View className="flex-1 pr-4">
              <Text
                allowFontScaling={false}
                className="text-base font-medium flex-shrink"
              >
                {getFullServiceName(servicesChoosen)}
              </Text>
            </View>

            <View className="items-end justify-center">
              <View className="flex-row justify-between items-center space-x-2">
                <Text
                  allowFontScaling={false}
                  className="text-base font-medium"
                >
                  {t('reviewBooking.total')}
                </Text>
                <Text
                  allowFontScaling={false}
                  className="text-base font-medium"
                >
                  {workshop.currency}
                  {formatPrice(
                    workshop.servicePrice ?? 0,
                    workshop.discount ?? 0,
                  )}
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                className="font-medium text-xs text-tic"
              >
                {t('reviewBooking.includesTaxesAndFees')}
              </Text>
            </View>
          </CrossPlatformButtonLayout>
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
  cardContainer: {
    position: 'relative',
    width: '100%',
    borderColor: Colors.light.lightGrey,
  },
  image: {
    width: '100%',
    height: isScreenSmall() ? 110 : 150,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default memo(WorkshopCard);
