import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import MapIcon from '@/assets/svg/location/map.svg'
import FilterIcon from '@/assets/svg/operations/filter.svg'
import OrderIcon from '@/assets/svg/operations/order.svg'
import LocationPin from '@/components/modal/LocationPin';
import MapModal from '@/components/modal/MapModal';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import HorizontalLine from '@/components/ui/HorizontalLine';
import IconTextPair from '@/components/ui/IconTextPair';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import {Colors} from '@/constants/Colors';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {LatLng} from 'react-native-maps';

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

  const [isMapVisible, setIsMapVisible] = useState(false);

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

        <CrossPlatformButtonLayout onPress={() => setIsMapVisible(true)}>
          <LocationPin />
        </CrossPlatformButtonLayout>

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
              {/* Future filter dropdown here */}
            </View>

            <View className="flex-1">
              <CrossPlatformButtonLayout
                containerTailwindCss="flex-1"
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

        {isMapVisible && <MapModal setIsMapVisible={setIsMapVisible} />}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
