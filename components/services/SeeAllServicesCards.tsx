import {Image, Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import LoadingSpinner from '../ui/loading/LoadingSpinner';
import navigationPush from '@/services/navigation/push';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import Service from '@/types/Service';
import {setServicesChoosenByUsers} from '@/stateManagement/redux/slices/servicesSlice';
import {forwardRef, useContext, useImperativeHandle} from 'react';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import useServices from '@/hooks/api/useServices';
import CrossPlatformButtonLayout from '../ui/buttons/CrossPlatformButtonLayout';
import HorizontalLine from '../ui/HorizontalLine';

interface SeeAllServicesCardsProps {
  workshopId?: number;
}

const SeeAllServicesCards = forwardRef(
  ({workshopId}: SeeAllServicesCardsProps, ref) => {
    const dispatch = useAppDispatch();
    const {navigation} = useContext(NavigationContext);
    const {services, loadingServices, setLoadingServices} =
      useServices(workshopId);

    useImperativeHandle(ref, () => ({
      loadingServices,
      setLoadingServices,
    }));

    const handleOnSeeAllServices = () => {
      navigationPush(navigation, 'ChooseServicesScreen');
    };

    const handleOnSelectService = (service: Service) => {
      navigationPush(navigation, 'RegisterVehicleScreen');
      dispatch(setServicesChoosenByUsers(service));
    };

    return loadingServices ? (
      <LoadingSpinner />
    ) : (
      services.length > 0 && (
        <View>
          <HorizontalLine />
          <Text className="font-medium text-base mt-2 mb-3">
            Services offered
          </Text>
          <View className="flex-row flex-wrap justify-center items-start">
            {services.slice(0, 4).map((service, index) => (
              <CrossPlatformButtonLayout
                onPress={() => handleOnSelectService(service)}
                key={service.id}
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
            <Pressable
              className="border-2 border-grey-light items-center justify-center p-1 mx-2.5 my-0.5 rounded-xl"
              onPress={handleOnSeeAllServices}
            >
              <Text className="text-base font-medium">See all services</Text>
            </Pressable>
          )}
          <HorizontalLine tailwindCssContainer="mt-2" />
        </View>
      )
    );
  },
);

export default SeeAllServicesCards;
