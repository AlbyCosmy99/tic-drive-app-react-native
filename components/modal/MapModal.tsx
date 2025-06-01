import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker, Region, PROVIDER_DEFAULT} from 'react-native-maps';
import {Ionicons} from '@expo/vector-icons';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {POIMarker} from '@/types/nav/map/POIMarker';
import TicDriveSpinner from '../ui/spinners/TicDriveSpinner';
import useUserLocation from '@/hooks/location/useUserLocation';
import Workshop from '@/types/workshops/Workshop';
import getNearbyWorkshops from '@/services/http/requests/get/workshops/getNearbyWorkshops';
import useJwtToken from '@/hooks/auth/useJwtToken';
import getAllWorkshops from '@/services/http/requests/get/workshops/getAllWorkshops';
import {setWorkshop} from '@/stateManagement/redux/slices/bookingSlice';
import formatPrice from '@/utils/currency/formatPrice.';
import WorkshopCard from '../WorkshopCard';

interface MapModalProps {
  setIsMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapModal({setIsMapVisible}: MapModalProps) {
  const navigation = useTicDriveNavigation();
  const dispatch = useAppDispatch();

  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [poiMarkers, setPoiMarkers] = useState<POIMarker[]>([]);
  const [selectedPOI, setSelectedPOI] = useState<POIMarker | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const [count, setCount] = useState(0);

  const user = useAppSelector(state => state.auth.user);
  const token = useJwtToken();
  const services = useAppSelector(state => state.booking.services);
  const {loading: loadingLocation, userLocation} = useUserLocation();
  const hasFetchedNearby = useRef(false);

  const fetchAllWorkshops = async () => {
    setLoadingWorkshops(true);
    const response = await getAllWorkshops(
      token ?? '',
      0,
      2,
      '',
      services[services.length - 1]?.id,
    );
    setWorkshops(response.data.workshops);
    setCount(response.data.count);
    setLoadingWorkshops(false);
  };

  const fetchNearbyWorkshops = async () => {
    if (!userLocation) {
      setLoadingWorkshops(false);
      return;
    }

    setLoadingWorkshops(true);
    try {
      const response = await getNearbyWorkshops(
        token ?? '',
        0,
        50,
        '',
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        services[services.length - 1]?.id,
      );

      if (response.data.count > 0) {
        setWorkshops(response.data.nearbyWorkshops);
        setCount(response.data.count);
      } else {
        await fetchAllWorkshops();
      }
    } catch (err) {
      console.error('Error fetching nearby workshops:', err);
      await fetchAllWorkshops();
    } finally {
      setLoadingWorkshops(false);
    }
  };

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
    if (!loadingLocation && userLocation && !hasFetchedNearby.current) {
      hasFetchedNearby.current = true;
      fetchNearbyWorkshops();
    }
  }, [loadingLocation, userLocation]);

  useEffect(() => {
    if (!loadingWorkshops) {
      setPoiMarkers(
        workshops.map(workshop => ({
          coordinate: {
            latitude: workshop.latitude,
            longitude: workshop.longitude,
          },
          price: workshop.servicePrice ?? 0,
          discount: workshop.discount,
          currency: workshop.currency ?? '€',
          id: workshop.id,
          workshopName: workshop.workshopName,
          workshop: workshop,
        })),
      );
    }
  }, [workshops, loadingWorkshops]);

  const handlePOISelect = (poi: POIMarker) => {
    dispatch(setWorkshop(poi.workshop));
    setIsMapVisible(false);
    navigationPush(navigation, 'WorkshopDetailsScreen');
  };

  return (
    <Modal animationType="slide">
      <View style={styles.container}>
        {initialRegion ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_DEFAULT}
            initialRegion={initialRegion}
            showsUserLocation
            showsMyLocationButton
            clusterColor="#4CAF50"
            clusterTextColor="#fff"
            radius={30}
            toolbarEnabled={false}
          >
            {poiMarkers.map(poi => (
              <Marker
                key={poi.id}
                coordinate={poi.coordinate}
                onPress={() => setSelectedPOI(poi)}
              >
                <View style={{alignItems: 'center'}}>
                  {poi.price > 0 ? (
                    <View style={styles.priceBubble}>
                      <Text style={styles.priceText}>
                        {formatPrice(poi.price, poi.discount) + poi.currency}
                      </Text>
                    </View>
                  ) : (
                    <Ionicons
                      name="location-sharp"
                      size={36}
                      color="#4CAF50"
                      style={styles.iconPin}
                    />
                  )}
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <TicDriveSpinner />
        )}

        {loadingWorkshops && (
          <View style={styles.loadingOverlay}>
            <TicDriveSpinner />
          </View>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMapVisible(false)}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>

        {selectedPOI && (
          <Modal
            animationType="fade"
            transparent
            visible
            onRequestClose={() => setSelectedPOI(null)}
          >
            <TouchableWithoutFeedback onPress={() => setSelectedPOI(null)}>
              <View style={styles.previewBackdrop}>
                <TouchableWithoutFeedback>
                  <View style={styles.previewCard}>
                    <WorkshopCard workshop={selectedPOI.workshop} />

                    <TouchableOpacity
                      onPress={() => setSelectedPOI(null)}
                      style={styles.modalCloseButton}
                    >
                      <Ionicons name="close" size={22} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.viewDetailsButton}
                      onPress={() => {
                        handlePOISelect(selectedPOI);
                        setSelectedPOI(null);
                      }}
                    >
                      <Text style={styles.viewDetailsText}>Vedi dettagli</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
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
  iconPin: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  previewBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  previewCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
    height: 400,
  },
  modalCloseButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 16 : 12,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },

  viewDetailsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
