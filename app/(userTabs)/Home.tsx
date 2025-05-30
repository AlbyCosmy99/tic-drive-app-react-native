import NissanIcon from '@/assets/svg/vehicles/makes/nissan.svg';
import PeugeotIcon from '@/assets/svg/vehicles/makes/peugeot.svg';
import FilterSearchModal from '@/components/modal/FilterSearchModal';
import LocationPin from '@/components/modal/LocationPin';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import TicDriveReminderCard from '@/components/ui/cards/notifications/TicDriveReminderCard';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';
import {Colors} from '@/constants/Colors';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useUserLocation from '@/hooks/location/useUserLocation';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import axiosClient from '@/services/http/axiosClient';
import navigationPush from '@/services/navigation/push';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {setSelectedCar} from '@/stateManagement/redux/slices/carsSlice';
import Workshop from '@/types/workshops/Workshop';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import {Entypo} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import debounce from 'lodash.debounce';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import MapModal from '@/components/modal/MapModal';
import getAllWorkshops from '@/services/http/requests/get/workshops/getAllWorkshops';
import getNearbyWorkshops from '@/services/http/requests/get/workshops/getNearbyWorkshops';
import isScreenSmall from '@/services/responsive/isScreenSmall';
import {reset, setWorkshop} from '@/stateManagement/redux/slices/bookingSlice';
import {setLastWorkshopSelectedFromFilter} from '@/stateManagement/redux/slices/workshopsSlice';

export default function UserHome() {
  const [filter, setFilter] = useState('');
  const navigation = useTicDriveNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const servicesRef = useRef();
  const {t} = useTranslation();
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();
  const token = useJwtToken();

  const {loading: loadingLocation, userLocation} = useUserLocation();
  const hasFetchedNearby = useRef(false);

  const fetchAllWorkshops = async () => {
    setLoadingWorkshops(true);
    const response = await getAllWorkshops(token ?? '', 0, 2, '');
    setWorkshops(response.data.workshops);
    setCount(response.data.count);
    setLoadingWorkshops(false);
  };

  const fetchNearbyWorkshops = async () => {
    if (!userLocation) {
      setLoadingWorkshops(false);
      return;
    }

    setLoadingWorkshops(true);

    try {
      const response = await getNearbyWorkshops(token ?? '', 0, 2, '', {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });

      if (response.data.count > 0) {
        setWorkshops(response.data.nearbyWorkshops);
        setCount(response.data.count);
      } else {
        await fetchAllWorkshops();
      }
    } catch (err) {
      console.error('Error fetching nearby workshops:', err);
      await fetchAllWorkshops();
    } finally {
      setLoadingWorkshops(false);
    }
  };

  useEffect(() => {
    if (!loadingLocation && userLocation && !hasFetchedNearby.current) {
      hasFetchedNearby.current = true;
      fetchNearbyWorkshops();
    }
  }, [loadingLocation, userLocation]);

  const {setCarSelectedByMakeAndModel, setCarSelectedByPlate} =
    useContext(CarContext);

  const [isMapVisible, setIsMapVisible] = useState(false);

  const handleOnSeeAllWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen');
  };

  const handleVehicles = () => {
    token
      ? navigationPush(navigation, 'UserVehiclesScreen')
      : navigationPush(navigation, 'UserAuthenticationScreen', {
          isUser: true,
        });
  };

  const onRefresh = () => {
    setRefreshing(true);
    servicesRef.current?.setLoadingServices(true);
    fetchNearbyWorkshops();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useFocusEffect(() => {
    dispatch(reset());
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
              <Entypo
                name="login"
                size={isScreenSmall() ? 26 : 32}
                color={Colors.light.ticText}
              />
            )
          }
          onRightContent={() => {
            navigationPush(navigation, 'UserAuthenticationScreen', {
              isUser: true,
            });
          }}
        />
        <CrossPlatformButtonLayout onPress={() => setIsMapVisible(true)}>
          <LocationPin />
        </CrossPlatformButtonLayout>

        <View className="flex-row items-center relative">
          <TicDriveInput
            existsLeftIcon
            existsRightIcon
            placeholder={t('workshops.searchWorkshop')}
            containerViewStyleTailwind={`flex-1 ${
              isScreenSmall() ? 'h-[50px]' : 'h-[60px]'
            }`}
            inputContainerStyle={{
              marginTop: 4,
              height: isScreenSmall() ? 44 : 48,
            }}
            onChange={text => debouncedOnHomeSearch(text)}
          />
          {filter && (
            <FilterSearchModal
              elements={filteredWorkshops}
              idToCompareForClock={lastWorkshopSelectedFromFilter?.id}
              emptyElementsMessage={t('workshops.noWorkshopsWithFilter')}
              onElementPress={(elem: any) => {
                navigationPush(navigation, 'WorkshopDetailsScreen');
                dispatch(setWorkshop(elem));
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
              <Text
                className={`font-semibold ${
                  isScreenSmall() ? 'text-lg' : 'text-xl'
                } m-2.5 mt-1`}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {t('home.findRightWorkshop')}
              </Text>
              <View className="flex-row mx-2.5 justify-start items-start">
                {loadingWorkshops ? (
                  <TicDriveSpinner />
                ) : (
                  <View className="flex-column w-full">
                    <View className="flex-row justify-start items-start mb-2.5">
                      {workshops.map(workshop => (
                        <WorkshopCardMini
                          key={workshop.id}
                          workshop={workshop}
                        />
                      ))}
                    </View>
                    {workshops.length === 0 && (
                      <Text
                        className="font-medium mb-2"
                        allowFontScaling={false}
                      >
                        {t('workshops.noWorkshopsAvailable')}
                      </Text>
                    )}
                    {workshops.length > 0 && (
                      <CrossPlatformButtonLayout
                        removeAllStyles={false}
                        onPress={handleOnSeeAllWorkshops}
                        containerTailwindCss="border-2 border-grey-light items-center justify-center p-1.5 rounded-xl bg-white shadow-sm shadow-black/20"
                      >
                        <Text
                          className="text-base font-medium"
                          allowFontScaling={false}
                        >
                          {t('seeAll.workshops')}
                        </Text>
                      </CrossPlatformButtonLayout>
                    )}
                  </View>
                )}
              </View>
            </View>

            <View className="mt-2.5 mb-3">
              <Text
                className={`font-semibold ${
                  isScreenSmall() ? 'text-lg' : 'text-xl'
                } m-2.5 mb-0 mt-1`}
                allowFontScaling={false}
              >
                {t('home.discoverServicesAndBook')}
              </Text>
              <SeeAllServicesCards
                ref={servicesRef}
                topHorizontalLine={false}
              />
            </View>

            <View className="mx-3 p-1 rounded-xl">
              <Text
                className={`font-semibold ${
                  isScreenSmall() ? 'text-lg' : 'text-xl'
                } m-2.5 mx-0 mt-1`}
                allowFontScaling={false}
              >
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
                containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 m-2.5 rounded-xl bg-white shadow-sm shadow-black/20"
                onPress={handleVehicles}
              >
                <Text
                  className="text-base font-semibold"
                  allowFontScaling={false}
                >
                  {t('vehicles.handleVehicles')}
                </Text>
              </CrossPlatformButtonLayout>
            </View>

            {isMapVisible && <MapModal setIsMapVisible={setIsMapVisible} />}
          </ScrollView>
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
