import { Colors } from '@/constants/Colors';
import { Image } from '@rneui/themed';
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
import Workshop from '@/types/workshops/Workshop';
import openGoogleMaps from '@/services/map/openGoogleMaps';
import { useEffect, useState } from 'react';
import axiosClient from '@/services/http/axiosClient';
import clsx from 'clsx';
import getUserMainImage from '@/utils/files/getUserMainImage';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import getFullServiceName from '@/services/toString/getFullServiceName';

interface PaymentConfirmationCardProps {
  workshop: Workshop | null | undefined;
  timeDate: string;
  showDirectionsButton?: boolean;
  type: string;
  showReminderBell?: boolean;
  service: string;
  showLocation?: boolean;  
  showPayment?: boolean;   
}

const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({
  workshop,
  showDirectionsButton = true,
  type,
  showReminderBell = false,
  service,
  showLocation = true,  
  showPayment = true,   
}) => {
  const servicesChoosen = useServiceChoosenByCustomer();
  const [loadingServiceOfferedDetails, setLoadingServiceOfferedDetails] =
    useState(false);
  const [workshopDetailed, setWorkshopDetailed] = useState(workshop);
  const {setErrorMessage} = useGlobalErrors();
  useEffect(() => {
    const fetchServiceOfferedDetails = async () => {
      try {
        if (servicesChoosen.length === 0) {
          setErrorMessage(
            'Errore: problema nel recuperare il servizio scelto. Riprovare.',
          );
        } else {
          setLoadingServiceOfferedDetails(true);
          const response = await axiosClient.get(
            `OfferedServices?WorkshopId=${workshop?.id}&ServiceId=${servicesChoosen[servicesChoosen.length - 1].id}`,
          );

          const serviceOffered = response?.data?.length
            ? response?.data[0]
            : null;

          setWorkshopDetailed(prev => {
            if (!prev) return prev;

            return {
              ...prev,
              currency: serviceOffered?.currency || 'USD',
              servicePrice: serviceOffered?.price || 0,
              discount: serviceOffered?.discount || 0,
            };
          });
        }
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
          {workshopDetailed?.images?.length && (
            <Image
              source={{uri: getUserMainImage(workshopDetailed.images)?.url}}
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
              className={clsx(
                'text-xs font-medium',
                type === 'Confirmed' ? 'text-drive' : 'text-[#D28B30]',
              )}
            >
              {type}
            </Text>
            <Text className="font-medium text-xl">
              {workshopDetailed?.workshopName}
            </Text>
            {(service || servicesChoosen.length > 0) && (
              <View className="bg-green-light p-1.5 rounded self-start mt-1">
                <Text className="text-green-dark font-semibold">
                  {service || getFullServiceName(servicesChoosen)}
                </Text>
              </View>
            )}
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

      <View className="mb-4">
        {loadingServiceOfferedDetails ? (
          <View className="justify-center items-center w-full h-full">
            <ActivityIndicator
              size="large"
              color={Colors.light.bookingsOptionsText}
            />
          </View>
        ) : (
          <View className="mb-2">
            <IconTextPair
              icon={<CalendarIcon />}
              text={'Lunedì 12 Maggio - 10:30'}
            />
            <IconTextPair icon={<CreditCardIcon />} text="€120 da pagare" />
            {workshopDetailed?.address && (
              <IconTextPair
                icon={<PinIcon fill={Colors.light.ticText} />}
                text={workshopDetailed.address}
              />
            )}
          </View>
        )}
      </View>

      {showDirectionsButton && (
        <View className="mt-5">
          <TicDriveOptionButton
            icon={<DirectionIcon />}
            text="Directions"
            textTailwindCss="font-medium text-base"
            onPress={() =>
              openGoogleMaps(
                workshopDetailed?.address,
                workshopDetailed?.latitude,
                workshopDetailed?.longitude,
              )
            }
          />
        </View>
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
