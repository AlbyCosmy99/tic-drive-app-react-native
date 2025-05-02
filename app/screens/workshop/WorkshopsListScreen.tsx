import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import MapIcon from '@/components/svgs/location/Map';
import FilterIcon from '@/components/svgs/operations/Filter';
import OrderIcon from '@/components/svgs/operations/Order';
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
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
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

  // ✅ Add mock workshops near Padova
  useEffect(() => {
    setPoiMarkers([
      {
        id: 1,
        price: 60,
        coordinate: {latitude: 45.4064, longitude: 11.8768},
        workshop: {
          id: 1,
          name: 'AutoFix Padova',
          address: 'Via Roma 1, Padova',
          latitude: 45.4064,
          longitude: 11.8768,
          profileImageUrl: 'https://example.com/workshops/1.jpg',
          ProfileImageUrl: 'https://example.com/workshops/1.jpg',
          meanStars: 4.5,
          numberOfReviews: 120,
          servicePrice: 60,
          currency: '€',
          discount: 10,
          isFavorite: true,
          isVerified: true,
        },
      },
      {
        id: 2,
        price: 55,
        coordinate: {latitude: 45.4081, longitude: 11.879},
        workshop: {
          id: 2,
          name: 'Officina Verona Auto',
          address: 'Via Trieste 23, Padova',
          latitude: 45.4081,
          longitude: 11.879,
          profileImageUrl: 'https://example.com/workshops/2.jpg',
          ProfileImageUrl: 'https://example.com/workshops/2.jpg',
          meanStars: 4.1,
          numberOfReviews: 90,
          servicePrice: 55,
          currency: '€',
          discount: 5,
          isFavorite: false,
          isVerified: true,
        },
      },
      {
        id: 3,
        price: 70,
        coordinate: {latitude: 45.4032, longitude: 11.8734},
        workshop: {
          id: 3,
          name: 'Car Repair Center',
          address: 'Via Venezia 15, Padova',
          latitude: 45.4032,
          longitude: 11.8734,
          profileImageUrl: 'https://example.com/workshops/3.jpg',
          ProfileImageUrl: 'https://example.com/workshops/3.jpg',
          meanStars: 4.8,
          numberOfReviews: 200,
          servicePrice: 70,
          currency: '€',
          discount: 0,
          isFavorite: true,
          isVerified: true,
        },
      },
      {
        id: 4,
        price: 50,
        coordinate: {latitude: 45.4076, longitude: 11.8702},
        workshop: {
          id: 4,
          name: 'Garage Due Ruote',
          address: 'Via Umberto I, Padova',
          latitude: 45.4076,
          longitude: 11.8702,
          profileImageUrl: 'https://example.com/workshops/4.jpg',
          ProfileImageUrl: 'https://example.com/workshops/4.jpg',
          meanStars: 3.9,
          numberOfReviews: 60,
          servicePrice: 50,
          currency: '€',
          isFavorite: false,
          isVerified: false,
        },
      },
      {
        id: 5,
        price: 65,
        coordinate: {latitude: 45.4055, longitude: 11.8812},
        workshop: {
          id: 5,
          name: 'Speedy Mechanic',
          address: 'Via Galileo Galilei 5, Padova',
          latitude: 45.4055,
          longitude: 11.8812,
          profileImageUrl: 'https://example.com/workshops/5.jpg',
          ProfileImageUrl: 'https://example.com/workshops/5.jpg',
          meanStars: 4.3,
          numberOfReviews: 85,
          servicePrice: 65,
          currency: '€',
          discount: 15,
          isFavorite: true,
          isVerified: true,
        },
      },
      {
        id: 6,
        price: 58,
        coordinate: {latitude: 45.4021, longitude: 11.8788},
        workshop: {
          id: 6,
          name: 'Officina del Centro',
          address: 'Via Beato Pellegrino 12, Padova',
          latitude: 45.4021,
          longitude: 11.8788,
          profileImageUrl: 'https://example.com/workshops/6.jpg',
          ProfileImageUrl: 'https://example.com/workshops/6.jpg',
          meanStars: 4.0,
          numberOfReviews: 72,
          servicePrice: 58,
          currency: '€',
          isFavorite: false,
          isVerified: true,
        },
      },
      {
        id: 7,
        price: 62,
        coordinate: {latitude: 45.4094, longitude: 11.8751},
        workshop: {
          id: 7,
          name: 'Auto Service Padova',
          address: 'Via Belzoni 3, Padova',
          latitude: 45.4094,
          longitude: 11.8751,
          profileImageUrl: 'https://example.com/workshops/7.jpg',
          ProfileImageUrl: 'https://example.com/workshops/7.jpg',
          meanStars: 4.6,
          numberOfReviews: 100,
          servicePrice: 62,
          currency: '€',
          discount: 5,
          isFavorite: true,
          isVerified: true,
        },
      },
      {
        id: 8,
        price: 59,
        coordinate: {latitude: 45.406, longitude: 11.8799},
        workshop: {
          id: 8,
          name: 'Pit Stop Padova',
          address: 'Via Margherita 4, Padova',
          latitude: 45.406,
          longitude: 11.8799,
          profileImageUrl: 'https://example.com/workshops/8.jpg',
          ProfileImageUrl: 'https://example.com/workshops/8.jpg',
          meanStars: 3.8,
          numberOfReviews: 50,
          servicePrice: 59,
          currency: '€',
          isFavorite: false,
          isVerified: false,
        },
      },
      {
        id: 9,
        price: 68,
        coordinate: {latitude: 45.4047, longitude: 11.8746},
        workshop: {
          id: 9,
          name: 'Top Auto Garage',
          address: 'Via Giotto 21, Padova',
          latitude: 45.4047,
          longitude: 11.8746,
          profileImageUrl: 'https://example.com/workshops/9.jpg',
          ProfileImageUrl: 'https://example.com/workshops/9.jpg',
          meanStars: 4.9,
          numberOfReviews: 250,
          servicePrice: 68,
          currency: '€',
          isFavorite: true,
          isVerified: true,
        },
      },
      {
        id: 10,
        price: 52,
        coordinate: {latitude: 45.4078, longitude: 11.8729},
        workshop: {
          id: 10,
          name: 'EcoCar Service',
          address: 'Via San Francesco 9, Padova',
          latitude: 45.4078,
          longitude: 11.8729,
          profileImageUrl: 'https://example.com/workshops/10.jpg',
          ProfileImageUrl: 'https://example.com/workshops/10.jpg',
          meanStars: 4.2,
          numberOfReviews: 110,
          servicePrice: 52,
          currency: '€',
          discount: 10,
          isFavorite: true,
          isVerified: false,
        },
      },
    ]);
  }, []);

  // ✅ Set default map region around Padova
  useEffect(() => {
    if (!initialRegion) {
      setInitialRegion({
        latitude: 45.4064,
        longitude: 11.8768,
        latitudeDelta: 0.05,
        longitudeDelta: 0.025,
      });
    }
  }, []);

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

        <LocationPin />

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

        {isMapVisible && (
          <MapModal
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
