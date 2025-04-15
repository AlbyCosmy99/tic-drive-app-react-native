import {useContext, useEffect, useState} from 'react';
import * as Location from 'expo-location';
import {LatLng} from 'react-native-maps';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import getAddressFromCoords from '@/services/location/getAddressFromCoords';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {setAddress} from '@/stateManagement/redux/slices/authSlice';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const {setErrorMessage} = useContext(GlobalContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const fetchLocation = async () => {
      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setErrorMessage(
            'Location Disabled. Please enable location services in your phone settings.',
          );
          setLoading(false);
          return;
        }

        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage(
            'Permission Denied. Enable location access from Settings.',
          );
          setLoading(false);
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          location => {
            const {latitude, longitude} = location.coords;
            setUserLocation({latitude, longitude});
          },
        );
      } catch (err) {
        console.error('Location error:', err);
        setErrorMessage('Could not get your location. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();

    return () => {
      locationSubscription?.remove();
    };
  }, [setErrorMessage]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (userLocation) {
        const address = await getAddressFromCoords(
          userLocation.latitude,
          userLocation.longitude,
        );
        dispatch(setAddress(address));
      }
    };

    fetchAddress();
  }, [userLocation, dispatch]);

  return {userLocation, loading};
};

export default useUserLocation;
