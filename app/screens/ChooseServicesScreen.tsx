import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ServicesCards from '@/components/ServicesCards';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {Colors} from '@/constants/Colors';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import {
  reset,
  setAreServicesOn,
  setLastServiceSelectedFromFilter,
  setServicesChoosenByUsers,
} from '@/stateManagement/redux/slices/servicesSlice';
import {useTranslation} from 'react-i18next';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useCallback, useMemo, useState} from 'react';
import debounce from 'lodash.debounce';
import Service from '@/types/Service';
import axiosClient from '@/services/http/axiosClient';
import FilterSearchModal from '@/components/modal/FilterSearchModal';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';

export default function ChooseServicesScreen() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [filter, setFilter] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const navigation = useTicDriveNavigation();
  const token = useJwtToken();
  const {getCustomerCars, loadingCustomerCars} = useCustomerCars();

  //@ts-ignore
  const {category, buttonContainerTailwindCss, withSafeAreaView} =
    route?.params ?? {
      category: 'user',
      buttonContainerTailwindCss: '',
      withSafeAreaView: true,
    };

  const isUserLookingForServices = useMemo(() => {
    return category !== 'workshop';
  }, [category]);

  const lastServiceSelectedFromFilter = useAppSelector(
    state => state.services.lastServiceSelectedFromFilter,
  );

  const onSearch = async (search: string) => {
    setFilter(search);

    if (!search.trim()) {
      setFilteredServices([]);
      return;
    }

    const filteredServices = await axiosClient.get(
      `services?take=5&filter=${search}`,
    );
    setFilteredServices(filteredServices.data);
  };

  const isButtonDisabled =
    category === 'workshop'
      ? useAppSelector(state => state.services.servicesChoosenByWorkshops)
          .length === 0
      : useAppSelector(state => state.services.servicesChoosenByUsers)
          .length === 0;

  const debouncedOnHomeSearch = useCallback(debounce(onSearch, 500), []);

  useFocusEffect(() => {
    dispatch(setAreServicesOn(false));
  });

  return (
    <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
      <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.end,
        ]}
        className="flex-1 absolute w-full h-full"
      />
      <SafeAreaViewLayout
        disabled={withSafeAreaView !== undefined && !withSafeAreaView}
      >
        <TicDriveNavbar />
        <View className="flex-1 justify-between">
          <View className="flex-row items-center relative">
            <TicDriveInput
              isLeftIcon={true}
              isRightIcon={true}
              placeholder={t('service.searchService')}
              containerViewStyleTailwind="flex-1 h-[60px]"
              inputContainerStyle={{marginTop: 4, height: 48}}
              onChange={text => debouncedOnHomeSearch(text)}
              onRightIcon={() => dispatch(reset())}
            />
            {filter && (
              <FilterSearchModal
                elements={filteredServices}
                idToCompareForClock={lastServiceSelectedFromFilter?.id}
                emptyElementsMessage="No services with this filter."
                onElementPress={(elem: any) => {
                  navigationPush(navigation, 'RegisterVehicleScreen');
                  dispatch(setServicesChoosenByUsers(elem));
                  dispatch(setLastServiceSelectedFromFilter(elem));
                }}
              />
            )}
          </View>
          {!filter && (
            <ServicesCards
              isSingleChoice={isUserLookingForServices ? true : false}
              type={isUserLookingForServices ? 'user' : 'workshop'}
            />
          )}
        </View>
        {!filter && (
          <View className={`mb-2 ${buttonContainerTailwindCss}`}>
            <TicDriveButton
              text={
                isUserLookingForServices
                  ? t('service.bookAService')
                  : t('continue')
              }
              routeName={
                isUserLookingForServices
                  ? token
                    ? 'SelectVehicleScreen'
                    : 'RegisterVehicleScreen'
                  : 'UserAuthenticationScreen'
              }
              routeParams={
                isUserLookingForServices ? {} : {register: true, isUser: false}
              }
              disabled={isButtonDisabled}
            />
          </View>
        )}
      </SafeAreaViewLayout>
    </View>
  );
}
