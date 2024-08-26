import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Button, Text, Image } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
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
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setUserLocation({ latitude, longitude });
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handlePOISelect = (poi: POIMarker) => {
    setSelectedLocation(poi.coordinate);
    setSelectedPrice(poi.price);
    setLocationName(poi.name);
    setIsMapVisible(false);
    router.push({
      pathname: '../screens/WorkshopDetails',
      params: { id: poi.id }
    })
  };

  return (
    <Modal visible={isMapVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContent}>
        <GooglePlacesAutocomplete
          placeholder="Search"
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
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.searchInput,
            listView: styles.listView,
          }}
          fetchDetails={true}
        />
        {initialRegion && (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            {userLocation && ( // User location
              <Marker coordinate={userLocation} title="Your Location">
                <View style={styles.userIconContainer}>
                  <Image
                    source={require('../assets/images/favicon.png')}
                    style={styles.userIcon}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            )}

            {selectedLocation && selectedPrice !== null && ( //selected location
              <Marker coordinate={selectedLocation}>
                <View style={styles.selectedMarker}>
                  <Text style={styles.priceText}>{selectedPrice}</Text>
                </View>
              </Marker>
            )}

            {poiMarkers.map((poi, index) => (
              <Marker
                key={index}
                coordinate={poi.coordinate}
                title={poi.name}
                description={`Price: ${poi.price}`}
                image={poi.icon ? { uri: poi.icon } : undefined}
                onPress={() => handlePOISelect(poi)}
              >
                <View style={styles.markerContent}>
                  <Text style={styles.markerText}>{poi.price}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        )}
        <View style={styles.closeButtonContainer}>
          <Button title="Close" onPress={() => setIsMapVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
  searchInput: {
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 64,
    zIndex: 2,
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  markerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 3
  },
  markerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedMarker: { //container selected marker
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 3
  },
  priceText: { //text selected marker
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  userIcon: {
    width: 45,
    height: 45,
  },
});
