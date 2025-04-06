import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface POIMarker {
  coordinate: LatLng;
  name: string;
  price: number;
  icon?: string;
  id: number;
}

interface ServicesMapModalProps {
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

export default function ServicesMapModal({
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
}: ServicesMapModalProps) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        // return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setUserLocation({ latitude, longitude });
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.025,
      });
    })();
  }, []);

  const handlePOISelect = (poi: POIMarker) => {
    setSelectedLocation(poi.coordinate);
    setLocationName(poi.name);
    setIsMapVisible(false);
    router.push({
      pathname: '../screens/user/WorkshopDetails',
      params: { id: poi.id },
    });
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
            {poiMarkers.map((poi) => (
              <Marker
                key={poi.id}
                coordinate={poi.coordinate}
                onPress={() => handlePOISelect(poi)}
              >
                <View style={styles.priceBubble}>
                  <Text style={styles.priceText}>€{poi.price}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}

        {/* Google Search Bar */}
        <View style={styles.searchContainer}>
          
          <GooglePlacesAutocomplete
            placeholder="Padova, Italia, 35133"
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                setSelectedLocation({ latitude: lat, longitude: lng });
                setLocationName(details.formatted_address || data.description);
              }
              setIsMapVisible(false);
            }}
            query={{
              key: 'AIzaSyBpJqSqJaYw7xrmzjPxfLZhqU9M7R5ZRVk',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.listView,
            }}
          />
        </View>

        {/* Filter Button (Optional) */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtra</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => setIsMapVisible(false)}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 10,
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
  filterButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 90,
    left: 30,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  filterText: {
    fontWeight: '600',
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 35,
    right: 20,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    zIndex: 20,
  },
});
