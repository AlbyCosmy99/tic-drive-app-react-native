import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/stateManagement/redux/hooks';
import { setSelectedWorkshop } from '@/stateManagement/redux/slices/workshopsSlice';
import useUserLocation from '@/hooks/location/useUserLocation';
import { POIMarker } from '@/types/nav/map/POIMarker';
import axiosClient from '@/services/http/axiosClient'; 

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
  const { userLocation, loading } = useUserLocation();

  const token = useAppSelector(state => state.auth.token); 

  const [workshops, setWorkshops] = useState<POIMarker[]>([]);

  useEffect(() => {
    const fetchNearbyWorkshops = async () => {
      if (!userLocation || !token) return;

      setInitialRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.025,
      });

      try {
        const response = await axiosClient.get('/Workshops/nearby', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });

        const workshopData = response.data;
        setWorkshops(workshopData);
        setPoiMarkers(workshopData);
      } catch (error) {
        console.error('Error fetching nearby workshops:', error);
      }
    };

    fetchNearbyWorkshops();
  }, [userLocation, token]);

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
            {workshops.map(poi => (
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
