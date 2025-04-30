import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import { useAppDispatch } from '@/stateManagement/redux/hooks';
import { setSelectedWorkshop } from '@/stateManagement/redux/slices/workshopsSlice';
import useNearbyWorkshops from '@/hooks/location/useNearbyWorkshops';
import { POIMarker } from '@/types/nav/map/POIMarker';

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
  const navigation = useTicDriveNavigation();
  const dispatch = useAppDispatch();

  const { workshops, loading, userLocation } = useNearbyWorkshops();

  useEffect(() => {
    console.log("Workshops in MapModal:", workshops);  
    if (userLocation) {
      setInitialRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.025,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    setPoiMarkers(workshops);
  }, [workshops]);

  const handlePOISelect = (poi: POIMarker) => {
    dispatch(setSelectedWorkshop(poi.workshop));
    setIsMapVisible(false);
    navigationPush(navigation, 'WorkshopDetails');
  };

  return (
    <Modal visible={isMapVisible} animationType="slide">
      <View style={styles.container}>
        {loading || !initialRegion ? (
          <Text>Loading map...</Text>
        ) : (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
            showsUserLocation
          >
            {poiMarkers.map((poi) => (
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
  priceBubble: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    zIndex: 30,
  },
});
