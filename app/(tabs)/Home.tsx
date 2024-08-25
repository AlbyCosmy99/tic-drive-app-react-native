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
    <SafeAreaView style={styles.safeArea}>
      <TicDriveNavbar />
      <View style={styles.headerServicesHomeContainer}>
          <TicDriveInput isLeftIcon={true} isRightIcon={true} placeholder='Search workshop'/>
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity style={styles.filterButton} onPress={() => alert('filter services')}>
              <FilterIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.cards}>
        <ServicesMap />
        <View>
          <WorkshopCards />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  cards: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#efefef',
    borderRadius: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    marginTop: 20,
    height:55,
    width: '100%',
  },
  inputText: {
    color: Colors.light.text,
    fontSize: 18,
    marginLeft: 8
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  headerServicesHomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonContainer: {
    width: 55,
    height: 55,
    borderColor: Colors.light.SegmentedControlBackground,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 15,
    marginBottom: 4
  },
  filterButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
