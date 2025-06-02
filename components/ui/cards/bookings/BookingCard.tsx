import {Colors} from '@/constants/Colors';
import {Image} from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import IconTextPair from '../../IconTextPair';
import CalendarIcon from '@/assets/svg/calendar/event_available.svg';
import CreditCardIcon from '@/assets/svg/payment/creditCard.svg';
import PinIcon from '@/assets/svg/location_on.svg';
import DirectionIcon from '@/assets/svg/assistant_direction.svg';
import BellIcon from '@/assets/svg/notifications/Bell1.svg';
import TicDriveOptionButton from '../../buttons/TicDriveOptionButton';
import openGoogleMaps from '@/services/map/openGoogleMaps';
import clsx from 'clsx';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';

interface BookingCardProps {
  showDirectionsButton?: boolean;
  type: string;
  showReminderBell?: boolean;
  workshopName: string;
  workshopAddress: string;
  workshopLatitude: number;
  workshopLongitude: number;
  workshopImageUrl?: string;
  serviceName: string;
  time: string;
  price: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  showDirectionsButton = true,
  type,
  showReminderBell = false,
  workshopName,
  serviceName,
  workshopAddress,
  workshopLatitude,
  workshopLongitude,
  workshopImageUrl,
  time,
  price,
}) => {
  const onOpenMaps = () =>
    openGoogleMaps(workshopAddress, workshopLatitude, workshopLongitude);

  return (
    <View
      className={`rounded-lg border p-4 pt-0 border-grey-light w-full ${!showDirectionsButton && 'pb-0'}`}
    >
      <View className="flex flex-row my-4 justify-between items-start">
        <View className="flex-row">
          {workshopImageUrl && (
            <Image
              source={{uri: workshopImageUrl}}
              containerStyle={styles.image}
              PlaceholderContent={
                <ActivityIndicator
                  size="large"
                  color={Colors.light.bookingsOptionsText}
                />
              }
            />
          )}
          <View>
            <Text
              allowFontScaling={false}
              className={clsx(
                'text-xs font-medium',
                type === 'Confirmed' ? 'text-drive' : 'text-[#D28B30]',
              )}
            >
              {type}
            </Text>
            <Text allowFontScaling={false} className="font-medium text-xl">
              {workshopName}
            </Text>
            <View className="bg-green-light p-1.5 rounded self-start mt-1 max-w-[260px]">
              <Text
                allowFontScaling={false}
                className="text-green-dark font-semibold"
              >
                {serviceName}
              </Text>
            </View>
          </View>
        </View>

        {showReminderBell && (
          <TouchableOpacity
            className="ml-2 mt-1"
            onPress={() => console.log('Bell pressed')}
          >
            <View className="mt-4">
              <BellIcon fill="#6B7280" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <HorizontalLine />

      <View className="mb-2">
        <View className={showDirectionsButton ? 'mb-2' : ''}>
          <IconTextPair icon={<CalendarIcon />} text={time} />
          <IconTextPair icon={<CreditCardIcon />} text={`${price} da pagare`} />
          <CrossPlatformButtonLayout onPress={onOpenMaps}>
            <IconTextPair
              icon={<PinIcon fill={Colors.light.ticText} />}
              text={workshopAddress}
              textTailwindCss="underline"
            />
          </CrossPlatformButtonLayout>
        </View>
      </View>

      {showDirectionsButton && (
        <TicDriveOptionButton
          icon={<DirectionIcon />}
          text="Directions"
          textTailwindCss="font-medium text-base"
          onPress={onOpenMaps}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
});

export default BookingCard;
