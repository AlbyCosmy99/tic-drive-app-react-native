import {Colors} from '@/constants/Colors';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import {LinearGradient} from 'expo-linear-gradient';
import {useContext} from 'react';
import FilterIcon from '../../assets/svg/discover_tune.svg';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {globalStyles} from '@/styles/globalStyles';
import GlobalContext from '@/stateManagement/contexts/GlobalContext';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationPush from '@/services/navigation/push';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

export default function UserHome() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const user = useAppSelector(state => state.auth.user);
  const userServicesChoosen = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );
  const {navigation} = useContext(NavigationContext);

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaViewLayout>
        <TicDriveNavbar isLoginAvailable={false} />
        {userServicesChoosen.length > 0 ? (
          <View className="flex-row items-center">
            <TicDriveInput
              isLeftIcon={true}
              isRightIcon={true}
              placeholder="Search workshop"
              containerViewStyleTailwind="flex-1 justify-center items-center"
              onChange={text => {
                setWorkshopFilter(text);
              }}
            />
            <View
              className="justify-center items-center ml-2 mb-1 border-2 rounded-xl mx-3.5 w-14 h-14"
              style={styles.filterButtonContainer}
            >
              <TouchableOpacity
                className="justify-center items-center h-full w-full"
                onPress={() => alert('filter services')}
                accessible={true}
                accessibilityLabel="Filter workshops"
              >
                <FilterIcon width={22} height={22} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text className="text-center m-4 font-bold text-xl">
              Welcome {user?.name}
            </Text>
            <HorizontalLine />
          </View>
        )}
        <View className="flex-1">
          <WorkshopCards />
          {user && user.category === 'user' && !navigation?.canGoBack() && (
            <View className="absolute bottom-3 left-0 right-0">
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    borderColor: Colors.light.SegmentedControlBackground,
  },
});
