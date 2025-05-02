import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Region, LatLng} from 'react-native-maps';
import {Ionicons} from '@expo/vector-icons';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import useNearbyWorkshops from '@/hooks/location/useNearbyWorkshops';
import {POIMarker} from '@/types/nav/map/POIMarker';
import TicDriveSpinner from '../ui/spinners/TicDriveSpinner';

interface MapModalProps {
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapModal({setIsMapVisible}: MapModalProps) {
  const navigation = useTicDriveNavigation();
  const dispatch = useAppDispatch();

  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    undefined,
  );
  const [poiMarkers, setPoiMarkers] = useState<POIMarker[]>([]);

  const {workshops, loadingWorkshops} = useNearbyWorkshops(0, 50);

  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (user?.coordinates) {
      const lat = user.coordinates.latitude;
      const radiusInKm = 10;

      const latitudeDelta = (radiusInKm * 2) / 111;
      const longitudeDelta =
        (radiusInKm * 2) / (111 * Math.cos((lat * Math.PI) / 180));

      setInitialRegion({
        latitude: lat,
        longitude: user.coordinates.longitude,
        latitudeDelta,
        longitudeDelta,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!loadingWorkshops && workshops.length > 0) {
      setPoiMarkers(
        workshops.map(workshop => ({
          coordinate: {
            latitude: workshop.latitude,
            longitude: workshop.longitude,
          },
          price: workshop.servicePrice ?? 0,
          currency: workshop.currency ?? '€',
          id: workshop.id,
          name: workshop.name,
          workshop: workshop,
        })),
      );
    }
  }, [workshops, loadingWorkshops]);

  const handlePOISelect = (poi: POIMarker) => {
    dispatch(setSelectedWorkshop(poi.workshop));
    setIsMapVisible(false);
    navigationPush(navigation, 'WorkshopDetails');
  };

  return (
    <Modal animationType="slide">
      <View style={styles.container}>
        {loadingWorkshops && !poiMarkers ? (
          <TicDriveSpinner />
        ) : (
          poiMarkers.length > 0 && (
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
                    <Text style={styles.priceText}>
                      {poi?.price ? poi?.price + poi.currency : poi.name}
                    </Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )
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
