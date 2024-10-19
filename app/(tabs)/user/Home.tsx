import {Colors} from '@/constants/Colors';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import {LinearGradient} from 'expo-linear-gradient';
import {useContext, useEffect} from 'react';
import GlobalContext from '@/app/stateManagement/contexts/GlobalContext';
import { useAppSelector } from '@/app/stateManagement/redux/hooks';
import { globalStyles } from '@/app/globalStyles';
import FilterIcon from '../../../assets/svg/discover_tune.svg';

export default function HomeTab() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user)

  useEffect(() => {
    alert(user?.category)
  }, [])

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaView className="flex-1" style={globalStyles().safeAreaView}>
        <TicDriveNavbar isLoginAvailable={isUserLogged ? true : true} />
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
        <View className="flex-1">
          <WorkshopCards />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  filterButtonContainer: {
    borderColor: Colors.light.SegmentedControlBackground,
  },
});
