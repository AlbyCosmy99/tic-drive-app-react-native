import {Pressable, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {
  reset,
  setAreServicesOn,
  setServicesChoosenByUsers,
} from '@/stateManagement/redux/slices/servicesSlice';
import {useFocusEffect} from '@react-navigation/native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {Colors} from '@/constants/Colors';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {Entypo} from '@expo/vector-icons';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import TicDriveReminderCard from '@/components/ui/cards/notifications/TicDriveReminderCard';
import NissanIcon from '@/assets/svg/vehicles/makes/nissan.svg';
import PeugeotIcon from '@/assets/svg/vehicles/makes/peugeot.svg';
import {useTranslation} from 'react-i18next';
import axiosClient from '@/services/http/axiosClient';
import Service from '@/types/Service';
import Workshop from '@/types/workshops/Workshop';

export default function UserHome() {
  const [filter, setFilter] = useState('');
  const navigation = useTicDriveNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const servicesRef = useRef();
  const {t} = useTranslation();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);

  const {workshops, loadingWorkshops, setLoadingWorkshops} = useWorkshops(0, 2);

  const dispatch = useAppDispatch();
  const token = useJwtToken();

  const handleOnSeeAllWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen');
  };

  const handleOnRegisterVehicle = () => {
    token
      ? navigationPush(navigation, 'RegisterVehicleScreen')
      : navigationPush(navigation, 'UserAuthenticationScreen', {
          isUser: true,
        });
    //to-do: once the vehicle is registered instead of going to workshops, go to vehicles and register it on account
  };

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
  });

  const onHomeSearch = async (search: string) => {
    setFilter(search);

    if (!search.trim()) {
      setFilteredServices([]);
      setFilteredWorkshops([]);
      return;
    }

    const filteredServices = await axiosClient.get(
      `services?take=3&filter=${search}`,
    );
    setFilteredServices(filteredServices.data);

    const filteredWorkshops = await axiosClient.get(
      `workshops?take=3&filter=${search}`,
    );
    setFilteredWorkshops(filteredWorkshops.data.workshops);
  };

  const debouncedOnHomeSearch = useCallback(debounce(onHomeSearch, 500), []);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar
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
        <View className="flex-row items-center relative">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder={t('home.searchInput')}
            containerViewStyleTailwind="flex-1 h-[60px]"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={text => debouncedOnHomeSearch(text)}
          />
          {filter && (
            <View className="absolute top-[60px] bg-white w-full z-10 p-2">
              <View className="border-black border-2 p-2">
                <Text className="text-center text-base font-semibold">
                  Workshops
                </Text>
                {filteredWorkshops.length > 0 ? (
                  <View className="mb-1">
                    {filteredWorkshops.map(workshop => (
                      <CrossPlatformButtonLayout
                        key={workshop.id}
                        removeAllStyles
                        onPress={() => {
                          navigationPush(navigation, 'WorkshopDetails');
                          dispatch(setSelectedWorkshop(workshop));
                        }}
                      >
                        <Text className="text-center mt-1 font-semibold p-1">
                          {workshop.name}
                        </Text>
                      </CrossPlatformButtonLayout>
                    ))}
                  </View>
                ) : (
                  <Text className="text-center mt-1 mb-2">
                    No workshops with this filter.
                  </Text>
                )}
                <HorizontalLine />
                <Text className="text-center text-base font-semibold">
                  Services
                </Text>
                <View className="mb-1">
                  {filteredServices.length > 0 ? (
                    <View>
                      {filteredServices.map(service => (
                        <CrossPlatformButtonLayout
                          removeAllStyles
                          onPress={() => {
                            navigationPush(navigation, 'RegisterVehicleScreen');
                            dispatch(setServicesChoosenByUsers(service));
                          }}
                        >
                          <Text
                            className="text-center mt-1 font-semibold p-1"
                            key={service.id}
                          >
                            {service.title}
                          </Text>
                        </CrossPlatformButtonLayout>
                      ))}
                    </View>
                  ) : (
                    <Text className="text-center mt-1">
                      No services with this filter.
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>

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
                  <LoadingSpinner />
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
                    <CrossPlatformButtonLayout
                      onPress={handleOnSeeAllWorkshops}
                      containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 my-2.5 rounded-xl"
                    >
                      <Text className="text-base font-medium">
                        {t('seeAll.workshops')}
                      </Text>
                    </CrossPlatformButtonLayout>
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
            <SeeAllServicesCards ref={servicesRef} topHorizontalLine={false} />
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
              containerTailwindCss="border-2 border-grey-light items-center justify-center p-1 m-2.5 rounded-xl bg-white"
              onPress={() => handleOnRegisterVehicle()}
            >
              <Text className="text-base font-medium text-drive">
                {t('vehicles.handleVehicles')}
              </Text>
            </CrossPlatformButtonLayout>
          </View>
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
