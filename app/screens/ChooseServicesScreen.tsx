import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ServicesCards from '@/components/ServicesCards';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {Colors} from '@/constants/Colors';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {useRoute} from '@react-navigation/native';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import {useTranslation} from 'react-i18next';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useCallback, useState} from 'react';
import debounce from 'lodash.debounce';
import Service from '@/types/Service';
import axiosClient from '@/services/http/axiosClient';
import FilterSearchModal from '@/components/modal/FilterSearchModal';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {
  setLastServiceSelectedFromFilter,
  setService,
} from '@/stateManagement/redux/slices/bookingSlice';

export default function ChooseServicesScreen() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [filter, setFilter] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const navigation = useTicDriveNavigation();
  const token = useJwtToken();

  //@ts-ignore
  const {buttonContainerTailwindCss, withSafeAreaView} = route?.params ?? {
    buttonContainerTailwindCss: '',
    withSafeAreaView: true,
  };

  const lastServiceSelectedFromFilter = useAppSelector(
    state => state.booking.lastServiceSelectedFromFilter,
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

  const isButtonDisabled = !useAppSelector(state => state.booking.service);

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
      <SafeAreaViewLayout
        disabled={withSafeAreaView !== undefined && !withSafeAreaView}
      >
        <TicDriveNavbar />
        <View className="flex-1 justify-between">
          <View className="flex-row items-center relative">
            <TicDriveInput
              existsLeftIcon
              existsRightIcon
              placeholder={t('service.searchService')}
              containerViewStyleTailwind="flex-1 h-[60px]"
              inputContainerStyle={{marginTop: 4, height: 48}}
              onChange={text => debouncedOnHomeSearch(text)}
              onRightIcon={() => dispatch(setService(undefined))}
            />
            {filter && (
              <FilterSearchModal
                elements={filteredServices}
                idToCompareForClock={lastServiceSelectedFromFilter?.id}
                emptyElementsMessage="No services with this filter."
                onElementPress={(elem: any) => {
                  navigationPush(navigation, 'RegisterVehicleScreen');
                  dispatch(setService(elem));
                  dispatch(setLastServiceSelectedFromFilter(elem));
                }}
              />
            )}
          </View>
          {!filter && <ServicesCards />}
        </View>
        {!filter && (
          <View className={`mb-2 ${buttonContainerTailwindCss}`}>
            <TicDriveButton
              text={t('bookNow')}
              routeName={
                token ? 'SelectVehicleScreen' : 'RegisterVehicleScreen'
              }
              disabled={isButtonDisabled}
            />
          </View>
        )}
      </SafeAreaViewLayout>
    </View>
  );
}
