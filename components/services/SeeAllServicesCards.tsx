import {Image, Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import LoadingSpinner from '../ui/loading/LoadingSpinner';
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

interface SeeAllServicesCardsProps {
  workshopId?: number;
  topHorizontalLine?: boolean;
  bottomHorizontalLine?: boolean;
  showSubtitle?: boolean;
}

const SeeAllServicesCards = forwardRef(
  (
    {
      workshopId,
      topHorizontalLine = true,
      bottomHorizontalLine = true,
      showSubtitle = false,
    }: SeeAllServicesCardsProps,
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const {navigation} = useContext(NavigationContext);
    const {services, loadingServices, setLoadingServices} =
      useServices(workshopId);
    const {t} = useTranslation();
    const modalRef = useRef<UserCalendarModalRef>(null);

    useImperativeHandle(ref, () => ({
      loadingServices,
      setLoadingServices,
    }));

    const handleOnSeeAllServices = () => {
      navigationPush(navigation, 'ChooseServicesScreen');
    };

    const handleOnSelectService = (service: Service) => {
      modalRef.current?.openModal();
      //navigationPush(navigation, 'RegisterVehicleScreen');
      dispatch(setServicesChoosenByUsers(service));
    };

    return loadingServices ? (
      <LoadingSpinner />
    ) : (
      services.length > 0 && (
        <View>
          {topHorizontalLine && <HorizontalLine />}
          {showSubtitle && (
            <Text className="font-medium text-base mt-2 mb-3 mx-2.5">
              Services offered
            </Text>
          )}
          <View className="flex justify-center items-center flex-1">
            <UserCalendarModal showButton={false} ref={modalRef} />
          </View>
          <View className="flex-row flex-wrap justify-center items-start">
            {services.slice(0, 4).map((service, index) => (
              <CrossPlatformButtonLayout
                onPress={() => handleOnSelectService(service)}
                key={service.id}
                styleContainer={{width: '42%', height: 40}}
                containerTailwindCss="mx-2.5"
                buttonTailwindCss="justify-start"
              >
                {service?.icon && (
                  <Image source={{uri: service.icon}} width={24} height={24} />
                )}
                <Text className="text-sm font-medium ml-2">
                  {service.title}
                </Text>
              </CrossPlatformButtonLayout>
            ))}
          </View>
          {services.length > 4 && (
            <CrossPlatformButtonLayout
              onPress={handleOnSeeAllServices}
              containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl"
            >
              <Text className="text-base font-medium">
                {t('seeAll.services')}
              </Text>
            </CrossPlatformButtonLayout>
          )}
          {bottomHorizontalLine && (
            <HorizontalLine tailwindCssContainer="mt-2" />
          )}
        </View>
      )
    );
  },
);

export default SeeAllServicesCards;
