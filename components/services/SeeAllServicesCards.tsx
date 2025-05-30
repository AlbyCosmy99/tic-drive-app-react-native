import {Image, Text, View} from 'react-native';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import Service from '@/types/Service';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import HorizontalLine from '../ui/HorizontalLine';
import {useTranslation} from 'react-i18next';
import UserCalendarModal, {
  UserCalendarModalRef,
} from '../ui/modals/UserCalendarModal';
import TicDriveSpinner from '../ui/spinners/TicDriveSpinner';
import useJwtToken from '@/hooks/auth/useJwtToken';
import getServices from '@/services/http/requests/get/services/getServices';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import {
  addService,
  setServiceTreeLevel,
} from '@/stateManagement/redux/slices/bookingSlice';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import serviceHasChildren from '@/services/http/requests/get/services/serviceHasChildren';

interface SeeAllServicesCardsProps {
  workshopId?: string;
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
    const navigation = useTicDriveNavigation();
    const [services, setServices] = useState<Service[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const {t} = useTranslation();
    const modalRef = useRef<UserCalendarModalRef>(null);
    const token = useJwtToken();
    const languageCode = useAppSelector(state => state.language.languageCode);
    const {setErrorMessage} = useGlobalErrors();
    const serviceTreeLevel = useAppSelector(
      state => state.booking.serviceTreeLevel,
    );
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      loadingServices,
      setLoadingServices,
    }));

    useEffect(() => {
      const fetchServices = async () => {
        try {
          setLoadingServices(true);
          const data = await getServices(
            workshopId ?? '',
            languageCode,
            undefined,
            true,
          );
          setServices(data);
        } catch (e) {
          setErrorMessage('Failed to fetch services');
        } finally {
          setLoadingServices(false);
        }
      };

      if (loadingServices) {
        fetchServices();
      }
    }, [workshopId, languageCode, loadingServices]);

    const handleOnSeeAllServices = () => {
      navigationPush(navigation, 'ChooseServicesScreen');
    };

    const handleOnSelectService = async (service?: Service) => {
      if (!service) return;
      try {
        setLoading(true);
        const hasChildren = await serviceHasChildren(service.id);

        if (hasChildren) {
          navigation.push('ChooseServicesScreen', {
            fatherId: service.id,
            showCalendarModal,
          });
          dispatch(setServiceTreeLevel(serviceTreeLevel + 1));
          dispatch(addService({service, index: serviceTreeLevel - 1}));
        } else {
          if (showCalendarModal) {
            modalRef.current?.openModal(service);
          } else {
            dispatch(addService({service, index: serviceTreeLevel - 1}));
            navigationPush(
              navigation,
              token ? 'SelectVehicleScreen' : 'RegisterVehicleScreen',
            );
          }
        }
      } catch (e: any) {
        setErrorMessage(
          e.message ?? 'An error occurred while selecting service',
        );
      } finally {
        setLoading(false);
      }
    };

    if (loadingServices) {
      return (
        <View className="h-28 justify-center items-center">
          <TicDriveSpinner />
        </View>
      );
    }

    return services.length > 0 ? (
      <View>
        {topHorizontalLine && <HorizontalLine />}
        <View className="flex flex-wrap flex-row justify-between px-2 mt-2">
          {services.slice(0, 4).map(service => (
            <View key={service.id} className="w-[48%] mb-2">
              <CrossPlatformButtonLayout
                removeAllStyles={false}
                onPress={() => handleOnSelectService(service)}
                styleContainer={{minHeight: 40}}
                containerTailwindCss="border border-gray-300 flex-row items-center justify-start p-2 rounded-xl"
                buttonTailwindCss="justify-start"
              >
                {service?.icon && (
                  <Image
                    source={{uri: service.icon}}
                    style={{width: 24, height: 24}}
                    resizeMode="contain"
                  />
                )}
                <View className="h-10 items-center justify-center w-full px-1">
                  <Text
                    className="text-sm font-medium text-center"
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {service.title}
                  </Text>
                </View>
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
                <Text
                  className="text-base font-medium"
                  allowFontScaling={false}
                >
                  {t('seeAll.services')}
                </Text>
              </CrossPlatformButtonLayout>
            </View>
          )}
        </View>

        {showCalendarModal && (
          <UserCalendarModal
            ref={modalRef}
            workshopId={workshopId ?? ''}
            showButton={false}
          />
        )}

        {bottomHorizontalLine && <HorizontalLine tailwindCssContainer="mt-2" />}
      </View>
    ) : (
      <View className="px-2 py-4">
        <Text
          className="font-medium text-base text-center"
          allowFontScaling={false}
        >
          {t('services.noServicesAvailable')}
        </Text>
      </View>
    );
  },
);

export default SeeAllServicesCards;
