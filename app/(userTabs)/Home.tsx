import {Pressable, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import workshops from '@/constants/temp/Workshops';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import useServices from '@/hooks/api/useServices';
import {
  reset,
  setAreServicesOn,
  setServicesChoosenByUsers,
} from '@/stateManagement/redux/slices/servicesSlice';
import Service from '@/types/Service';
import {useFocusEffect} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import IconTextPair from '@/components/ui/IconTextPair';
import AddIcon from '@/assets/svg/add.svg';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

export default function UserHome() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);
  const {services, loadingServices} = useServices();
  const dispatch = useAppDispatch();

  const handleOnSeeAllWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen');
  };

  const handleOnSeeAllServices = () => {
    navigationPush(navigation, 'ChooseServicesScreen');
  };

  const handleOnSelectService = (service: Service) => {
    navigationPush(navigation, 'RegisterVehicleScreen');
    dispatch(setServicesChoosenByUsers(service));
  };

  const handleOnRegisterVehicle = () => {
    navigationPush(navigation, 'RegisterVehicleScreen');
    //to-do: once the vehicle is registered instead of going to workshops, go to vehicles and register it on account
  }

  useFocusEffect(() => {
    dispatch(setAreServicesOn(false));
    dispatch(reset());
  });

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="flex-row items-center">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder="Search workshop"
            containerViewStyleTailwind="flex-1 justify-center items-center"
            inputContainerStyle={{marginTop: 4}}
            onChange={text => {
              setWorkshopFilter(text);
            }}
          />
        </View>
        <ScrollView className='mb-2'>
          <View>
            <Text className="font-semibold text-xl m-2.5 mt-0">
              Find the workshop that's right for you
            </Text>
            <View>
              <View>
                <View className="flex-row mx-2.5 justify-start items-start">
                  <WorkshopCardMini workshop={workshops[0]} />
                  <WorkshopCardMini workshop={workshops[1]} />
                </View>
                <Pressable
                  className="border-2 border-grey-light items-center justify-center p-1 m-2.5 rounded-xl"
                  onPress={handleOnSeeAllWorkshops}
                >
                  <Text className="text-base font-medium">See all workshops</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="mt-1">
            <Text className="font-semibold text-xl m-2.5 mt-0">
              Discover services and book
            </Text>
            {
              loadingServices ? (
                <LoadingSpinner />
              ) : (
                <View>
              <View>
                <View className="flex-row flex-wrap justify-center items-start">
                  {services.slice(0, 4).map((service, index) => (
                    <Pressable
                      key={service.id}
                      className="border-2 border-grey-light items-center justify-center p-2 mx-2.5 my-1 rounded-xl"
                      onPress={() => handleOnSelectService(service)}
                      style={{width: '40%'}}
                    >
                      <Text className="text-base font-medium">
                        {service.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable
                  className="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl"
                  onPress={() => handleOnSeeAllServices()}
                >
                  <Text className="text-base font-medium">See all services</Text>
                </Pressable>
              </View>
            </View>
              )
            }
          </View>
          <View className="mt-2.5 mb-1">
            <Text className="font-semibold text-xl m-2.5 mt-0">
              Reminder
            </Text>
            <Pressable
              className="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl"
              onPress={() => handleOnRegisterVehicle()}
            >
              <IconTextPair text='Register your first vehicle' icon={<AddIcon />} textTailwindCss='text-base font-medium text-drive' containerTailwindCss='py-0' reverseIcon={true}/> 
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
