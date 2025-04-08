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
import {useContext, useEffect, useState} from 'react';
import axiosClient from '@/services/http/axiosClient';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';

const PaymentConfirmationCard = ({
  workshop,
  timeDate,
}: {
  workshop: Workshop | null | undefined;
  timeDate: string;
}) => {
  const servicesChoosen = useServicesChoosenByUsers();
  const [loadingServiceOfferedDetails, setLoadingServiceOfferedDetails] =
    useState(false);
  const [workshopDetailed, setWorkshopDetailed] = useState(workshop);

  const user = useAppSelector(state => state.auth.user);
  const languageCode = useAppSelector(state => state.language.languageCode);
  const carSelected = useAppSelector(state => state.cars.selectedCar);
  const token = useAppSelector(state => state.auth.token);

  const {setErrorMessage} = useContext(GlobalContext);

  const [
    loadingCarRegistrationConfirmation,
    setLoadingCarRegistrationConfirmation,
  ] = useState(false);

  const confirmCarSelected = async () => {
    try {
      setLoadingCarRegistrationConfirmation(true);
      await axiosClient.post(
        'cars',
        {
          name:
            languageCode === 'it'
              ? `La ${carSelected?.make} ${carSelected?.model} di ${user?.name}`
              : `${user?.name}'s ${carSelected?.make} ${carSelected?.model}`,
          plate: carSelected?.plateNumber,
          make: carSelected?.make,
          model: carSelected?.model,
          year: carSelected?.year,
          fuelType: carSelected?.fuel,
          transmissionType: carSelected?.transmission,
          engineDisplacement: carSelected?.engineDisplacement,
          km: carSelected?.mileage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (e: any) {
      setErrorMessage('A problem occured during the car registration.');
    } finally {
      setLoadingCarRegistrationConfirmation(false);
    }
  };

  useEffect(() => {
    const fetchServiceOfferedDetails = async () => {
      try {
        setLoadingServiceOfferedDetails(true);
        const response = await axiosClient.get(
          `OfferedServices?WorkshopId=${workshop?.id}&ServiceId=${servicesChoosen[0].id}`,
        );

        const serviceOffered = response?.data?.length
          ? response?.data[0]
          : null;

        setWorkshopDetailed(prev => {
          if (!prev) return prev;

          return {
            ...prev,
            currency: serviceOffered.currency,
            servicePrice: serviceOffered.price,
            discount: serviceOffered.discount,
          };
        });
        console.log(serviceOffered);
      } catch (e) {
        console.error('Error fetching service offered details:', e);
      } finally {
        setLoadingServiceOfferedDetails(false);
      }
    };

    confirmCarSelected();

    if (workshop?.id && servicesChoosen.length > 0) {
      fetchServiceOfferedDetails();
    }
  }, [workshop?.id, servicesChoosen]);

  return (
    <View className="rounded-lg border p-4 pt-0 border-grey-light w-full">
      <View className="flex flex-row my-4">
        <Image
          source={{uri: workshopDetailed?.profileImageUrl}}
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
          <Text className="font-medium text-xl">{workshopDetailed?.name}</Text>
          <View className="bg-green-light p-1.5 rounded self-start mt-1">
            <Text className="text-green-dark font-semibold">
              {servicesChoosen.length ? servicesChoosen[0].title : ''}
            </Text>
          </View>
        </View>
      </View>
      <HorizontalLine />
      <View className="h-32">
        {loadingServiceOfferedDetails || loadingCarRegistrationConfirmation ? (
          <View className="justify-center items-center w-full h-full">
            <ActivityIndicator
              size="large"
              color={Colors.light.bookingsOptionsText}
            />
          </View>
        ) : (
          <View className="mb-2">
            <IconTextPair icon={<CalendarIcon />} text={timeDate} />
            <IconTextPair
              icon={<CreditCardIcon />}
              text={`${workshopDetailed?.currency}${calculateWorkshopDiscount(workshopDetailed?.servicePrice ?? 0, workshop?.discount ?? 0)} total to pay`}
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
