import {Pressable, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext} from 'react';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import workshops from '@/constants/temp/Workshops';
import WorkshopCardMini from '@/components/workshop/WorkshopCardMini';

export default function UserHome() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);
  const {areServicesAvailable} = useAreServicesAvailable();

  const handleOnSeeAllWorkshops = () => {
    navigationPush(navigation, 'WorkshopsListScreen');
  };

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
        <Text className="font-semibold text-xl m-2.5 mt-0">
          Find the workshop that's right for you
        </Text>
        <View className="flex-1">
          {/* <WorkshopCards tailwindContainerCss="mb-0" /> */}
          <View className="flex-1">
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
          {!areServicesAvailable && (
            <View>
              <HorizontalLine />
              <TicDriveButton
                text="Book a service"
                onClick={() =>
                  navigationPush(navigation, 'ChooseServicesScreen')
                }
              />
            </View>
          )}
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
