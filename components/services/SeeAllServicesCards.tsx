import {Image, Text, View} from 'react-native';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import Service from '@/types/Service';
import {setServicesChoosenByUsers} from '@/stateManagement/redux/slices/servicesSlice';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import useServices from '@/hooks/api/useServices';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import HorizontalLine from '../ui/HorizontalLine';
import {useTranslation} from 'react-i18next';
import UserCalendarModal, {
  UserCalendarModalRef,
} from '../ui/modals/UserCalendarModal';
import TicDriveSpinner from '../ui/spinners/TicDriveSpinner';
import useJwtToken from '@/hooks/auth/useJwtToken';

interface SeeAllServicesCardsProps {
  workshopId?: number;
  topHorizontalLine?: boolean;
  bottomHorizontalLine?: boolean;
  showSubtitle?: boolean;
  showCalendarModal?: boolean;
}

const SeeAllServicesCards = forwardRef(
  (
    {
      workshopId,
      topHorizontalLine = true,
      bottomHorizontalLine = true,
      showSubtitle = false,
      showCalendarModal = false,
    }: SeeAllServicesCardsProps,
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const {navigation} = useContext(NavigationContext);
    const {services, loadingServices, setLoadingServices} =
      useServices(workshopId);
    const {t} = useTranslation();
    const modalRef = useRef<UserCalendarModalRef>(null);
    const token = useJwtToken()

    useImperativeHandle(ref, () => ({
      loadingServices,
      setLoadingServices,
    }));

    const handleOnSeeAllServices = () => {
      navigationPush(navigation, 'ChooseServicesScreen');
    };

    const handleOnSelectService = (service: Service) => {
      if (showCalendarModal) {
        modalRef.current?.openModal();
      } else {
        navigationPush(navigation, token ? 'SelectVehicleScreen' : 'RegisterVehicleScreen');
      }
      dispatch(setServicesChoosenByUsers(service));
    };

    return loadingServices ? (
      <TicDriveSpinner />
    ) : services.length > 0 ? (
      <View>
        {topHorizontalLine && <HorizontalLine />}
        <View className="flex justify-center items-center flex-1 mt-2">
          <UserCalendarModal showButton={false} ref={modalRef} />
        </View>
        <View className="flex flex-wrap flex-row justify-between px-2">
          {services.slice(0, 4).map(service => (
            <View key={service.id} className="w-[48%] mb-2">
              <CrossPlatformButtonLayout
                removeAllStyles={false}
                onPress={() => handleOnSelectService(service)}
                styleContainer={{height: 40}}
                containerTailwindCss="border border-gray-300 flex-row items-center justify-start p-2 rounded-xl"
                buttonTailwindCss="justify-start"
              >
                {service?.icon && (
                  <Image source={{uri: service.icon}} width={24} height={24} />
                )}
                <Text className="text-sm font-medium ml-2">
                  {service.title}
                </Text>
              </CrossPlatformButtonLayout>
            </View>
          ))}
          {services.length > 4 && (
            <View className="mb-2 w-full">
              <CrossPlatformButtonLayout
                removeAllStyles={false}
                onPress={handleOnSeeAllServices}
                containerTailwindCss="border-2 border-grey-light items-center justify-center p-1.5 rounded-xl bg-white shadow-sm shadow-black/20"
              >
                <Text className="text-base font-medium">
                  {t('seeAll.services')}
                </Text>
              </CrossPlatformButtonLayout>
            </View>
          )}
        </View>

        {bottomHorizontalLine && <HorizontalLine tailwindCssContainer="mt-2" />}
      </View>
    ) : (
      <Text className="font-medium mb-2">No services available yet.</Text>
    );
  },
);

export default SeeAllServicesCards;
