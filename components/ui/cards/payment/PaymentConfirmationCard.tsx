import {Colors} from '@/constants/Colors';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import {Image} from '@rneui/themed';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import IconTextPair from '../../IconTextPair';
import CalendarIcon from '../../../../assets/svg/calendar/event_available.svg';
import CreditCardIcon from '../../../../assets/svg/payment/credit_card.svg';
import PinIcon from '../../../../assets/svg/location_on.svg';
import DirectionIcon from '../../../../assets/svg/assistant_direction.svg';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import TicDriveOptionButton from '../../buttons/TicDriveOptionButton';
import Workshop from '@/types/workshops/Workshop';
import openGoogleMaps from '@/services/map/openGoogleMaps';

const PaymentConfirmationCard = ({
  workshop,
  timeDate,
}: {
  workshop: Workshop | null | undefined;
  timeDate: string;
}) => {
  const servicesChoosen = useServicesChoosenByUsers();

  return (
    <View className="rounded-lg border p-4 pt-0 border-grey-light w-full">
      <View className="flex flex-row my-4">
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
        <View>
          <Text className="text-xs font-medium" style={styles.pendingText}>
            Pending confirmation
          </Text>
          <Text className="font-medium text-xl">{workshop?.name}</Text>
          <View className="bg-green-light p-1.5 rounded self-start mt-1">
            <Text className="text-green-dark font-semibold">
              {servicesChoosen.length ? servicesChoosen[0].title : ''}
            </Text>
          </View>
        </View>
      </View>
      <HorizontalLine />
      <View className="mb-2">
        <IconTextPair icon={<CalendarIcon />} text={timeDate} />
        <IconTextPair
          icon={<CreditCardIcon />}
          text={`${workshop?.currency} ${calculateWorkshopDiscount(workshop?.servicePrice ?? 0, workshop?.discount ?? 0)} total to pay`}
        />
        {workshop?.address && (
          <IconTextPair
            icon={<PinIcon fill={Colors.light.ticText} />}
            text={workshop.address}
          />
        )}
      </View>
      <TicDriveOptionButton
        icon={<DirectionIcon />}
        text="Directions"
        textTailwindCss="font-medium text-base"
        onPress={() =>
          openGoogleMaps(
            workshop?.address,
            workshop?.latitude,
            workshop?.longitude,
          )
        }
      />
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
  pendingText: {
    color: '#D28B30',
  },
});

export default PaymentConfirmationCard;
