import NissanIcon from '@/components/svgs/vehicles/makes/Nissan';
import PeugeotIcon from '@/components/svgs/vehicles/makes/Peugeot';
import FilterSearchModal from '@/components/modal/FilterSearchModal';
import LocationPin from '@/components/modal/LocationPin';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import TicDriveReminderCard from '@/components/ui/cards/notifications/TicDriveReminderCard';
import HorizontalLine from '@/components/ui/HorizontalLine';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';
import {Colors} from '@/constants/Colors';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useUserLocation from '@/hooks/location/useUserLocation';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {setSelectedCar} from '@/stateManagement/redux/slices/carsSlice';
import {
  reset,
  setAreServicesOn,
} from '@/stateManagement/redux/slices/servicesSlice';
import {
  setLastWorkshopSelectedFromFilter,
  setSelectedWorkshop,
} from '@/stateManagement/redux/slices/workshopsSlice';
import Workshop from '@/types/workshops/Workshop';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import {Entypo} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import debounce from 'lodash.debounce';
import {useCallback, useContext, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';

export default function UserHome() {
  const [filter, setFilter] = useState('');
  const navigation = useTicDriveNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const servicesRef = useRef();
  const {t} = useTranslation();
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);

  const {workshops, loadingWorkshops, setLoadingWorkshops} = useWorkshops(0, 2);

  const {setCarSelectedByMakeAndModel, setCarSelectedByPlate} =
    useContext(CarContext);

  const dispatch = useAppDispatch();
  const token = useJwtToken();

  useUserLocation();

  const handleOnSeeAllWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen');
  };

  const handleVehicles = () => {
    token
      ? navigationPush(navigation, 'UserVehiclesScreen')
      : navigationPush(navigation, 'UserAuthenticationScreen', {
          isUser: true,
        });
    //to-do: once the vehicle is registered instead of going to workshops, go to vehicles and register it on account
  };
  const userAddress = useAppSelector(state => state.auth.user?.address) ?? '';

  const onRefresh = () => {
    setRefreshing(true);
    servicesRef.current?.setLoadingServices(true);
    setLoadingWorkshops(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useFocusEffect(() => {
    dispatch(setAreServicesOn(false));
    dispatch(reset());
    dispatch(setSelectedWorkshop(null));
    dispatch(setSelectedCar(undefined));
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel(undefined);
    }
    if (setCarSelectedByPlate) {
      setCarSelectedByPlate(undefined);
    }
  });

  const onSearch = async (search: string) => {
    setFilter(search);

    if (!search.trim()) {
      setFilteredWorkshops([]);
      return;
    }

    const filteredWorkshops = await axiosClient.get(
      `workshops?take=5&filter=${search}`,
    );
    setFilteredWorkshops(filteredWorkshops.data.workshops);
  };

  const debouncedOnHomeSearch = useCallback(debounce(onSearch, 500), []);

  const lastWorkshopSelectedFromFilter = useAppSelector(
    state => state.workshops.lastWorkshopSelectedFromFilter,
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar
          canGoBack={false}
          rightContent={
            !token && (
              <Entypo name="login" size={32} color={Colors.light.ticText} />
            )
          }
          onRightContent={() => {
            navigationPush(navigation, 'UserAuthenticationScreen', {
              isUser: true,
            });
          }}
        />
        <LocationPin />

        <View className="flex-row items-center relative">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder={t('workshops.searchWorkshop')}
            containerViewStyleTailwind="flex-1 h-[60px]"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={text => debouncedOnHomeSearch(text)}
          />
          {filter && (
            <FilterSearchModal
              elements={filteredWorkshops}
              idToCompareForClock={lastWorkshopSelectedFromFilter?.id}
              emptyElementsMessage="No workshops with this filter."
              onElementPress={(elem: any) => {
                navigationPush(navigation, 'WorkshopDetails');
                dispatch(setSelectedWorkshop(elem));
                dispatch(setLastWorkshopSelectedFromFilter(elem));
              }}
            />
          )}
        </View>

        {!filter && (
          <ScrollView
            className="mb-2"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.light.ticText]}
                tintColor={Colors.light.ticText}
              />
            }
          >
            <View>
              <Text className="font-semibold text-xl m-2.5 mt-1">
                {t('home.findRightWorkshop')}
              </Text>
              <View>
                <View className="flex-row mx-2.5 justify-start items-start">
                  {loadingWorkshops ? (
                    <TicDriveSpinner />
                  ) : (
                    <View className="flex-column w-full">
                      <View className="flex-row  justify-start items-start">
                        {workshops.map(workshop => (
                          <WorkshopCardMini
                            key={workshop.id}
                            workshop={workshop}
                          />
                        ))}
                      </View>
                      {workshops.length > 0 ? (
                        <CrossPlatformButtonLayout
                          removeAllStyles={false}
                          onPress={handleOnSeeAllWorkshops}
                          containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 my-2.5 rounded-xl"
                        >
                          <Text className="text-base font-medium">
                            {t('seeAll.workshops')}
                          </Text>
                        </CrossPlatformButtonLayout>
                      ) : (
                        <Text className="font-medium mb-2">
                          No workshops available yet.
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
            {!loadingWorkshops && <HorizontalLine />}
            <View className="mt-1 mb-3">
              <Text className="font-semibold text-xl m-2.5 mt-0">
                {t('home.discoverServicesAndBook')}
              </Text>
              <SeeAllServicesCards
                ref={servicesRef}
                topHorizontalLine={false}
              />
            </View>
            <View className="mx-3 mb-1 p-1 pb-2 rounded-xl">
              <Text className="font-semibold text-xl m-2.5 mt-1">
                {t('reminder')}
              </Text>

              <View
                style={{backgroundColor: '#FFFBE5'}}
                className="py-2 rounded-xl"
              >
                <TicDriveReminderCard
                  leftButtonText={t('bookNow')}
                  rightButtonText={t('RemindMeLater')}
                  logo={<NissanIcon />}
                  text={t('home.notifications.first')}
                />
                <TicDriveReminderCard
                  leftButtonText={t('discoverNow')}
                  rightButtonText={t('RemindMeLater')}
                  logo={<PeugeotIcon />}
                  text={t('home.notifications.second')}
                />
                <TicDriveReminderCard
                  leftButtonText={t('payNow')}
                  rightButtonText={t('RemindMeLater')}
                  logo={<NissanIcon />}
                  text={t('home.notifications.third')}
                />
              </View>
              <CrossPlatformButtonLayout
                removeAllStyles={false}
                containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 m-2.5 rounded-xl bg-white"
                onPress={() => handleVehicles()}
              >
                <Text className="text-base font-semibold">
                  {t('vehicles.handleVehicles')}
                </Text>
              </CrossPlatformButtonLayout>
            </View>
          </ScrollView>
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
