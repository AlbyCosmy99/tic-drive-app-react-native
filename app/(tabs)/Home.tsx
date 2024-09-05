import { Colors } from '@/constants/Colors';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterIcon from '../../assets/svg/discover_tune.svg';
import ServicesMap from '@/components/ServicesMap';
import TicDriveInput from '@/components/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';

export default function Tab() {
  return (
    <SafeAreaView style={styles.safeArea} className='flex-1'>
      <TicDriveNavbar />
      <View className='flex-row items-center'>
          <TicDriveInput isLeftIcon={true} isRightIcon={true} placeholder='Search workshop'/>
          <View className='justify-center items-center ml-2 mb-1 border-2 rounded-xl mx-3.5 w-14 h-14' style={styles.filterButtonContainer}>
            <TouchableOpacity className='justify-center items-center h-full w-full' onPress={() => alert('filter services')}>
              <FilterIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
      </View>
      <View className='flex-1'>
        <ServicesMap />
        <WorkshopCards />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.light.background,
  },
  filterButtonContainer: {
    borderColor: Colors.light.SegmentedControlBackground,
  },
});
