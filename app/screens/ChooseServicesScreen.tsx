import {Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import debounce from 'lodash.debounce';

import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import ServicesCards from '@/components/ServicesCards';
import FilterSearchModal from '@/components/modal/FilterSearchModal';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import serviceHasChildren from '@/services/http/requests/get/services/serviceHasChildren';

import {
  addService,
  setLastServiceSelectedFromFilter,
  setServices,
  setServiceTreeLevel,
} from '@/stateManagement/redux/slices/bookingSlice';

import {Colors} from '@/constants/Colors';
import Service from '@/types/Service';
import UserCalendarModal, {
  UserCalendarModalRef,
} from '@/components/ui/modals/UserCalendarModal';

type ParamList = {
  ChooseServicesScreen: {
    buttonContainerTailwindCss?: string;
    withSafeAreaView?: boolean;
    fatherId?: number;
  };
};

export default function ChooseServicesScreen() {
  const route = useRoute<RouteProp<ParamList, 'ChooseServicesScreen'>>();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const navigation = useTicDriveNavigation();
  const token = useJwtToken();
  const services = useServiceChoosenByCustomer();
  const {setErrorMessage} = useGlobalErrors();

  const [filter, setFilter] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<UserCalendarModalRef>(null);
  const workshop = useAppSelector(state => state.booking.workshop);
  const time = useAppSelector(state => state.booking.time)

  const {
    buttonContainerTailwindCss = '',
    withSafeAreaView = true,
    fatherId,
  } = route.params ?? {};

  const serviceTreeLevel = useAppSelector(
    state => state.booking.serviceTreeLevel,
  );
  const lastServiceSelectedFromFilter = useAppSelector(
    state => state.booking.lastServiceSelectedFromFilter,
  );

  const showCalendarModal = useMemo(() => {
    return !time
  }, [time])

  const onSearch = async (search: string) => {
    setFilter(search);
    if (!search.trim()) {
      setFilteredServices([]);
      return;
    }
    try {
      const response = await axiosClient.get(
        `services?take=5&filter=${search}`,
      );
      setFilteredServices(response.data);
    } catch (error) {
      setErrorMessage('Error fetching services');
    }
  };

  const handleOnService = async (service?: Service) => {
    if (showCalendarModal) {
      modalRef.current?.openModal(service);
    } else {
      if (service) {
        dispatch(addService({service, index: serviceTreeLevel - 1}));
      }
    }

    try {
      setLoading(true);
      const currentService = services[serviceTreeLevel - 1];
      const hasChildren = await serviceHasChildren(currentService?.id);
      if (hasChildren) {
        navigation.push('ChooseServicesScreen', {
          fatherId: currentService.id,
        });
        dispatch(setServiceTreeLevel(serviceTreeLevel + 1));
      } else if (!showCalendarModal) {
        navigationPush(
          navigation,
          token ? 'SelectVehicleScreen' : 'RegisterVehicleScreen',
        );
      }
    } catch (e: any) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = useMemo(() => {
    return services[serviceTreeLevel - 1] === undefined || loading;
  }, [services, serviceTreeLevel, loading]);

  const debouncedOnHomeSearch = useCallback(debounce(onSearch, 500), []);

  return (
    <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
      <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.end,
        ]}
        className="flex-1 absolute w-full h-full"
      />
      <SafeAreaViewLayout disabled={!withSafeAreaView}>
        <TicDriveNavbar />
        <View className="flex-1 justify-between">
          {fatherId ? (
            <Text
              className="text-lg font-semibold text-center"
              allowFontScaling={false}
            >
              Scegli l'opzione desiderata
            </Text>
          ) : (
            <View className="flex-row items-center relative">
              <TicDriveInput
                existsLeftIcon
                existsRightIcon
                placeholder={t('service.searchService')}
                containerViewStyleTailwind="flex-1 h-[60px]"
                inputContainerStyle={{marginTop: 4, height: 48}}
                onChange={text => debouncedOnHomeSearch(text)}
                onRightIcon={() => dispatch(setServices([]))}
              />
              {filter && (
                <FilterSearchModal
                  elements={filteredServices}
                  idToCompareForClock={lastServiceSelectedFromFilter?.id}
                  emptyElementsMessage="No services with this filter."
                  onElementPress={elem => {
                    navigationPush(navigation, 'RegisterVehicleScreen');
                    dispatch(setServices([elem]));
                    dispatch(setLastServiceSelectedFromFilter(elem));
                  }}
                />
              )}
            </View>
          )}

          {!filter &&
            (loading ? (
              <TicDriveSpinner />
            ) : (
              <ServicesCards fatherId={fatherId} />
            ))}
        </View>

        {!filter && (
          <View className={`mb-2 ${buttonContainerTailwindCss}`}>
            <TicDriveButton
              text={t('bookNow')}
              disabled={isButtonDisabled}
              onClick={() => handleOnService(services[serviceTreeLevel - 1])}
            />
          </View>
        )}
        {showCalendarModal && (
          <UserCalendarModal
            ref={modalRef}
            workshopId={workshop?.id ?? ''}
            showButton={false}
          />
        )}
      </SafeAreaViewLayout>
    </View>
  );
}
