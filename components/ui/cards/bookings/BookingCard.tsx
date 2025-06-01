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
import {useEffect, useMemo, useState} from 'react';
import axiosClient from '@/services/http/axiosClient';
import clsx from 'clsx';
import getUserMainImage from '@/utils/files/getUserMainImage';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import formatPrice from '@/utils/currency/formatPrice.';
import getFullServiceName from '@/services/toString/getFullServiceName';

interface BookingCardProps {
  showDirectionsButton?: boolean;
  type: string;
  showReminderBell?: boolean;
  
}

const BookingCard: React.FC<BookingCardProps> = ({
  showDirectionsButton = true,
  type,
  showReminderBell = false,
}) => {
  const [loadingServiceOfferedDetails, setLoadingServiceOfferedDetails] =
    useState(false);
  const workshop = useAppSelector(state => state.booking.workshop);
  const [workshopDetailed, setWorkshopDetailed] = useState(workshop);
  const services = useServiceChoosenByCustomer();
  const time = useAppSelector(state => state.booking.time);

  const price = useMemo(() => {
    return (
      workshop?.currency! +
      formatPrice(workshop?.servicePrice ?? 0, workshop?.discount ?? 0)
    );
  }, []);

  const {setErrorMessage} = useGlobalErrors();

  useEffect(() => {
    const fetchServiceOfferedDetails = async () => {
      try {
        if (services.length === 0) {
          setErrorMessage(
            'Errore: problema nel recuperare il servizio scelto. Riprovare.',
          );
        } else {
          setLoadingServiceOfferedDetails(true);
          const response = await axiosClient.get(
            `OfferedServices?WorkshopId=${workshop?.id}&ServiceId=${services[services.length - 1].id}`,
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

    if (workshop?.id && services.length > 0) {
      fetchServiceOfferedDetails();
    }
  }, [workshop?.id, services]);

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
              allowFontScaling={false}
              className={clsx(
                'text-xs font-medium',
                type === 'Confirmed' ? 'text-drive' : 'text-[#D28B30]',
              )}
            >
              {type}
            </Text>
            <Text allowFontScaling={false} className="font-medium text-xl">
              {workshopDetailed?.workshopName}
            </Text>
            {services.length > 0 && (
              <View className="bg-green-light p-1.5 rounded self-start mt-1 max-w-[260px]">
                <Text
                  allowFontScaling={false}
                  className="text-green-dark font-semibold"
                >
                  {getFullServiceName(services)}
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
            <IconTextPair icon={<CalendarIcon />} text={time} />
            <IconTextPair
              icon={<CreditCardIcon />}
              text={`${price} da pagare`}
            />
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
