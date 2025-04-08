import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {Marker, Region, LatLng} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import ToPreviousPage from '../navigation/ToPreviousPage';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import Workshop from '@/types/workshops/Workshop';

interface POIMarker {
  coordinate: LatLng;
  price: number;
  id: number;
  workshop: Workshop;
}

interface MapModalProps {
  isMapVisible: boolean;
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLocation: LatLng | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LatLng | null>>;
  locationName: string | null;
  setLocationName: React.Dispatch<React.SetStateAction<string | null>>;
  poiMarkers: POIMarker[];
  setPoiMarkers: React.Dispatch<React.SetStateAction<POIMarker[]>>;
  initialRegion: Region | null;
  setInitialRegion: React.Dispatch<React.SetStateAction<Region | null>>;
}

export default function MapModal({
  isMapVisible,
  setIsMapVisible,
  selectedLocation,
  setSelectedLocation,
  locationName,
  setLocationName,
  poiMarkers,
  setPoiMarkers,
  initialRegion,
  setInitialRegion,
}: MapModalProps) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const {setErrorMessage} = useContext(GlobalContext);

  const navigation = useTicDriveNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setErrorMessage(
            'Location Disabled. Please enable location services in your phone settings.',
          );
          return;
        }

        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage(
            'Permission Denied. Enable location access from Settings.',
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords;

        setUserLocation({latitude, longitude});
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.025,
        });
      } catch (err) {
        console.error('Location error:', err);
        Alert.alert('Error', 'Could not get your location. Please try again.');
      }
    })();
  }, []);

  const handlePOISelect = (poi: POIMarker) => {
    console.log(poi);
    dispatch(setSelectedWorkshop(poi.workshop));
    setIsMapVisible(false);
    navigationPush(navigation, 'WorkshopDetails');
  };

  return (
    <Modal visible={isMapVisible} animationType="slide">
      <View style={styles.container}>
        {initialRegion && (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
            showsUserLocation
          >
            {poiMarkers.map(poi => (
              <Marker
                key={poi.id}
                coordinate={poi.coordinate}
                onPress={() => handlePOISelect(poi)}
              >
                <View style={styles.priceBubble}>
                  <Text style={styles.priceText}>{poi.price}€</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMapVisible(false)}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 44,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 5,
  },
  priceBubble: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    right: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    zIndex: 30,
  },
});
