import { Colors } from '@/constants/Colors';
import { useServicesChoosenByUsers } from '@/hooks/user/useServiceChoosenByUsers';
import { Image } from '@rneui/themed';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import IconTextPair from '../../IconTextPair';
import CalendarIcon from '../../../../assets/svg/calendar/event_available.svg';
import CreditCardIcon from '../../../../assets/svg/payment/credit_card.svg';
import PinIcon from '../../../../assets/svg/location_on.svg';
import DirectionIcon from '../../../../assets/svg/assistant_direction.svg';
import BellIcon from '@/assets/svg/notifications/Bell1.svg';
import calculateWorkshopDiscount from '@/utils/workshops/calculateWorkshopDiscount';
import TicDriveOptionButton from '../../buttons/TicDriveOptionButton';
import Workshop from '@/types/workshops/Workshop';
import openGoogleMaps from '@/services/map/openGoogleMaps';
import { useEffect, useState } from 'react';
import axiosClient from '@/services/http/axiosClient';
import clsx from 'clsx';

interface PaymentConfirmationCardProps {
  workshop: Workshop | null | undefined;
  timeDate: string;
  showDirectionsButton?: boolean;
  type: 'Confirmed' | 'Pending confirmation';
  showReminderBell?: boolean;
}

const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({
  workshop,
  timeDate,
  showDirectionsButton = true,
  type,
  showReminderBell = false,
}) => {
  const servicesChoosen = useServicesChoosenByUsers();
  const [loadingServiceOfferedDetails, setLoadingServiceOfferedDetails] = useState(false);
  const [workshopDetailed, setWorkshopDetailed] = useState(workshop);

  useEffect(() => {
    const fetchServiceOfferedDetails = async () => {
      try {
        setLoadingServiceOfferedDetails(true);
        const response = await axiosClient.get(
          `OfferedServices?WorkshopId=${workshop?.id}&ServiceId=${servicesChoosen[0].id}`
        );

        const serviceOffered = response?.data?.length ? response?.data[0] : null;

        setWorkshopDetailed((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            currency: serviceOffered?.currency || 'USD', // default to USD if missing
            servicePrice: serviceOffered?.price || 0, // ensure price defaults to 0 if missing
            discount: serviceOffered?.discount || 0, // ensure discount defaults to 0 if missing
          };
        });
      } catch (e) {
        console.error('Error fetching service offered details:', e);
      } finally {
        setLoadingServiceOfferedDetails(false);
      }
    };

    if (workshop?.id && servicesChoosen.length > 0) {
      fetchServiceOfferedDetails();
    }
  }, [workshop?.id, servicesChoosen]);

  return (
    <View className="rounded-lg border p-4 pt-0 border-grey-light w-full">
      <View className="flex flex-row my-4 justify-between items-start">
        <View className="flex-row">
          <Image
            source={{ uri: workshopDetailed?.profileImageUrl }}
            containerStyle={styles.image}
            PlaceholderContent={
              <ActivityIndicator size="large" color={Colors.light.bookingsOptionsText} />
            }
          />
          <View>
            <Text
              className={clsx(
                'text-xs font-medium',
                type === 'Confirmed' ? 'text-drive' : 'text-[#D28B30]'
              )}
            >
              {type}
            </Text>
            <Text className="font-medium text-xl">{workshopDetailed?.name}</Text>
            {servicesChoosen.length > 0 && (
              <View className="bg-green-light p-1.5 rounded self-start mt-1">
                <Text className="text-green-dark font-semibold">{servicesChoosen[0].title}</Text>
              </View>
            )}
          </View>
        </View>

        {showReminderBell && (
          <TouchableOpacity className="ml-2 mt-1" onPress={() => console.log('Bell pressed')}>
            <View className="mt-4">
              <BellIcon width={16} height={15} fill="#6B7280" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <HorizontalLine />

      {/* CONTENT */}
      <View className="h-32">
        {loadingServiceOfferedDetails ? (
          <View className="justify-center items-center w-full h-full">
            <ActivityIndicator size="large" color={Colors.light.bookingsOptionsText} />
          </View>
        ) : (
          <View className="mb-2">
            <IconTextPair icon={<CalendarIcon />} text={timeDate} />
            <IconTextPair
              icon={<CreditCardIcon />}
              text={`${workshopDetailed?.currency}${calculateWorkshopDiscount(
                workshopDetailed?.servicePrice ?? 0,
                workshopDetailed?.discount ?? 0
              )} total to pay`}
              
            />
            {workshopDetailed?.address && (
              <IconTextPair icon={<PinIcon fill={Colors.light.ticText} />} text={workshopDetailed.address} />
            )}
          </View>
        )}
      </View>

      {showDirectionsButton && (
        <TicDriveOptionButton
          icon={<DirectionIcon />}
          text="Directions"
          textTailwindCss="font-medium text-base"
          onPress={() =>
            openGoogleMaps(
              workshopDetailed?.address,
              workshopDetailed?.latitude,
              workshopDetailed?.longitude
            )
          }
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

export default PaymentConfirmationCard;
