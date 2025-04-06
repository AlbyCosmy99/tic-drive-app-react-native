import {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {Colors} from '@/constants/Colors';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import HorizontalLine from '@/components/ui/HorizontalLine';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import IconTextPair from '@/components/ui/IconTextPair';
import OrderIcon from '@/assets/svg/operations/order.svg';
import FilterIcon from '@/assets/svg/operations/filter.svg';
import MapIcon from '@/assets/svg/location/map.svg';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import ServicesMapModal from '@/components/ServiceMapModal';
import {LatLng, Region} from 'react-native-maps';

interface OrderOption {
  label: string;
  value: 'asc' | 'desc';
}

interface FilterOption {
  label: string;
  value: string;
}

interface POIMarker {
  coordinate: LatLng;
  name: string;
  price: string;
  icon?: string;
  id: number;
}

const orderOptions: OrderOption[] = [
  {label: 'Ascending', value: 'asc'},
  {label: 'Descending', value: 'desc'},
];

const filterOptions: FilterOption[] = [
  {label: 'Price', value: 'price'},
  {label: 'Rating', value: 'rating'},
];

type RootStackParamList = {
  WorkshopsListScreen: {favorite: boolean};
};

export default function WorkshopsListScreen() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const route =
    useRoute<RouteProp<RootStackParamList, 'WorkshopsListScreen'>>();
  const {t} = useTranslation();
  const {favorite} = route.params;

  const [orderDropdownVisible, setOrderDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderOption>({
    label: 'Ascending',
    value: 'asc',
  });

  // ✅ Map Modal State
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [poiMarkers, setPoiMarkers] = useState<POIMarker[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const onOpenMap = () => {
    setIsMapVisible(true);
  };

  const renderDropdown = (
    options: FilterOption[] | OrderOption[],
    onSelect: (option: FilterOption | OrderOption) => void,
    onClose: () => void,
  ) => (
    <View
      style={{
        position: 'absolute',
        top: 38,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.light.lightGrey,
        borderRadius: 8,
        zIndex: 100,
        width: 150,
      }}
    >
      {options.map(option => (
        <CrossPlatformButtonLayout
          removeAllStyles
          styleContainer={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.lightGrey,
          }}
          key={option.value}
          onPress={() => {
            onSelect(option);
            onClose();
          }}
        >
          <Text>{option.label}</Text>
        </CrossPlatformButtonLayout>
      ))}
    </View>
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />

        <View className="flex-col items-center h-[102px] relative">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder={t('workshops.searchWorkshop')}
            containerViewStyleTailwind="flex-1 items-center"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={(text: string) => {
              setWorkshopFilter(text);
            }}
          />

          <View className="flex-row justify-between mx-1 mb-2 absolute bottom-0 w-full px-4">
            <View className="flex-1 relative">
              <CrossPlatformButtonLayout
                containerTailwindCss="flex-1"
                removeAllStyles
                onPress={() => {
                  setOrderDropdownVisible(!orderDropdownVisible);
                  setFilterDropdownVisible(false);
                }}
              >
                <IconTextPair
                  text="Order"
                  icon={<OrderIcon />}
                  textTailwindCss="text-base font-medium text-tic"
                  containerTailwindCss="border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
                  iconContainerTailwindCss="mr-1"
                />
              </CrossPlatformButtonLayout>
              {orderDropdownVisible &&
                renderDropdown(
                  orderOptions,
                  option => setSelectedOrder(option as OrderOption),
                  () => setOrderDropdownVisible(false),
                )}
            </View>

            <View className="flex-1 relative">
              <CrossPlatformButtonLayout
                containerTailwindCss="flex-1"
                removeAllStyles
                onPress={() => {
                  setFilterDropdownVisible(!filterDropdownVisible);
                  setOrderDropdownVisible(false);
                }}
              >
                <IconTextPair
                  text="Filter"
                  icon={<FilterIcon />}
                  textTailwindCss="text-base font-medium text-tic"
                  containerTailwindCss="flex-1 border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
                  iconContainerTailwindCss="mr-1"
                />
              </CrossPlatformButtonLayout>
              {/* future dropdown here */}
            </View>

            <View className="flex-1">
              <CrossPlatformButtonLayout
                containerTailwindCss="flex-1"
                removeAllStyles
                onPress={onOpenMap}
              >
                <IconTextPair
                  text="Map"
                  icon={<MapIcon />}
                  textTailwindCss="text-base font-medium text-tic"
                  containerTailwindCss="flex-1 border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
                  iconContainerTailwindCss="mr-1"
                />
              </CrossPlatformButtonLayout>
            </View>
          </View>
        </View>

        <HorizontalLine color={Colors.light.lightGrey} />
        <View className="flex-1">
          <WorkshopCards favorite={favorite} order={selectedOrder.value} />
        </View>

        {/* ✅ MAP MODAL */}
        {isMapVisible && (
          <ServicesMapModal
            isMapVisible={isMapVisible}
            setIsMapVisible={setIsMapVisible}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            locationName={locationName}
            setLocationName={setLocationName}
            poiMarkers={poiMarkers}
            setPoiMarkers={setPoiMarkers}
            initialRegion={initialRegion}
            setInitialRegion={setInitialRegion}
          />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
