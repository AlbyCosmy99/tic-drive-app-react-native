import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Region, LatLng} from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';
import ServicesMapModal from './ServiceMapModal';
import {Colors} from '@/constants/Colors';
import LocationPin from '../assets/svg/location_on.svg';
import workshops from '../constants/temp/Workshops';

interface POIMarker {
  coordinate: LatLng;
  name: string;
  price: string;
  icon?: string;
  id: number;
}

const ServicesMap: React.FC = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [poiMarkers, setPoiMarkers] = useState<POIMarker[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const customPOIs = [
    {
      name: 'Precision Works Garage',
      latitudeOffset: 0.01,
      longitudeOffset: 0.015,
    },
    {
      name: 'Steel & Torque Mechanics',
      latitudeOffset: -0.02,
      longitudeOffset: -0.025,
    },
    {
      name: 'Fusion Auto Repair',
      latitudeOffset: 0.03,
      longitudeOffset: -0.035,
    },
    {
      name: 'Engine Craftworks',
      latitudeOffset: -0.05,
      longitudeOffset: 0.045,
    },
    {
      name: 'MasterWrench Garage',
      latitudeOffset: 0.06,
      longitudeOffset: -0.01,
    },
    {name: 'RevLine Motorshop', latitudeOffset: -0.07, longitudeOffset: 0.02},
  ];

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = location.coords;

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Add custom POIs near the user's location
      addCustomPOIs(latitude, longitude);
    })();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      addCustomPOIs(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);

  const addCustomPOIs = (latitude: number, longitude: number) => {
    const markers = customPOIs.map((poi, index) => ({
      coordinate: {
        latitude: latitude + poi.latitudeOffset,
        longitude: longitude + poi.longitudeOffset,
      },
      name: workshops[index].title,
      price: workshops[index].price,
      id: workshops[index].id,
    }));
    setPoiMarkers(markers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <LocationPin
          width={24}
          name="location-pin"
          fill={Colors.light.ticText}
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsMapVisible(true)}
          accessible={true}
          accessibilityLabel={locationName || 'location name'}
        >
          <Text style={styles.placeholderText}>
            {locationName || 'Select workshop on map'}
          </Text>
        </TouchableOpacity>
      </View>

      <ServicesMapModal
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.SegmentedControlBackground,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  placeholderText: {
    color: Colors.light.placeholderText,
    fontSize: 18,
  },
});

export default ServicesMap;
