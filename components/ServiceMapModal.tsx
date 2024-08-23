import React from 'react';
import { StyleSheet, View, Modal, Button, Text } from 'react-native';
import MapView, { Marker, Region, LatLng, MapPressEvent } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface POIMarker {
  coordinate: LatLng;
  name: string;
  price: number;
  icon?: string;
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
  
  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    setInitialRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setIsMapVisible(false);
  };

  const handlePOISelect = (poi: POIMarker) => {
    setSelectedLocation(poi.coordinate);
    setLocationName(poi.name);
    setIsMapVisible(false);
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
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title={locationName || 'Selected Location'}
              />
            )}

            {poiMarkers.map((poi, index) => (
              <Marker
                key={index}
                coordinate={poi.coordinate}
                title={poi.name}
                description={`Price: $${poi.price}`}
                image={poi.icon ? { uri: poi.icon } : undefined}
                onPress={() => handlePOISelect(poi)}
              >
                <View style={styles.markerContent}>
                  <Text style={styles.markerText}>${poi.price}</Text>
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
  },
  markerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});
