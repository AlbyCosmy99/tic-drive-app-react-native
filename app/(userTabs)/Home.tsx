import {Colors} from '@/constants/Colors';
import {View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import {useContext} from 'react';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';

export default function UserHome() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const userServicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );
  const {navigation} = useContext(NavigationContext);

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
        <HorizontalLine color={Colors.light.lightGrey} />
        <View className="flex-1">
          <WorkshopCards tailwindContainerCss="mb-0" />
          {userServicesChoosen.length === 0 && (
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
