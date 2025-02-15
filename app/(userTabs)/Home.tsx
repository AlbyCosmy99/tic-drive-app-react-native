import {Pressable, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext, useRef, useState} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import useServices from '@/hooks/api/useServices';
import {
  reset,
  setAreServicesOn,
} from '@/stateManagement/redux/slices/servicesSlice';
import {useFocusEffect} from '@react-navigation/native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import IconTextPair from '@/components/ui/IconTextPair';
import AddIcon from '@/assets/svg/add.svg';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {Colors} from '@/constants/Colors';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import SeeAllServicesCards from '@/components/services/SeeAllServicesCards';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';

export default function UserHome() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const navigation = useTicDriveNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const servicesRef = useRef();

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

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="flex-row items-center">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder="Search workshop or service"
            containerViewStyleTailwind="flex-1 h-[60px]"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={text => {
              setWorkshopFilter(text);
            }}
          />
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
              Find the workshop that's right for you
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
                        See all workshops
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
              Discover services and book
            </Text>
            <SeeAllServicesCards ref={servicesRef} topHorizontalLine={false} />
          </View>
          <View className="mt-0.5 mx-3 mb-1 p-1 pb-2 rounded-xl" style={{backgroundColor: '#FFF8D5'}}>
            <Text className="font-semibold text-xl m-2.5 mt-1">Reminder</Text>
            <Pressable
              className="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl bg-white"
              onPress={() => handleOnRegisterVehicle()}
            >
              <IconTextPair
                text="Register your first vehicle"
                icon={<AddIcon />}
                textTailwindCss="text-base font-medium text-drive"
                containerTailwindCss="py-0"
                reverseIcon={true}
              />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
