import { Colors } from '@/constants/Colors';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterIcon from '../../assets/svg/discover_tune.svg';

export default function Tab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TicDriveNavbar />
      <View>
        <View style={styles.headerServicesHomeContainer}>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Search workshop"
              leftIcon={
                <Icon
                  name="search"
                  size={24}
                  color={Colors.light.ticText}
                />
              }
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              placeholderTextColor='#8b8b8b'
            />
          </View>
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity style={styles.filterButton} onPress={() => alert('filter services')}>
              <FilterIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cards}></View>
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
    marginHorizontal: 8,
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
