import { useEffect, useState } from 'react';
import axiosClient from '@/services/http/axiosClient';
import { POIMarker } from '@/types/nav/map/POIMarker';
import useUserLocation from '@/hooks/location/useUserLocation';
import { useAppSelector } from '@/stateManagement/redux/hooks';

export default function useNearbyWorkshops() {
  const { userLocation, loading: locationLoading } = useUserLocation();
  const token = useAppSelector(state => state.auth.token);

  const [workshops, setWorkshops] = useState<POIMarker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      if (!userLocation || !token) {
        console.log("User location or token not found");
        return;
      }

      setLoading(true);
      try {
        const response = await axiosClient.get('/Workshops/nearby', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            KmRange: 200,
          },
        });

        const rawWorkshops = response.data?.workshops ?? [];
        console.log("Fetched Workshops:", rawWorkshops);  // Log fetched workshops data

        const mapped: POIMarker[] = rawWorkshops.map((ws: any) => ({
          id: ws.id,
          coordinate: {
            latitude: ws.latitude,
            longitude: ws.longitude,
          },
          price: ws.servicePrice ?? 0,  // Fallback for null prices
          workshop: ws,
        }));

        console.log("Mapped POI Markers:", mapped); 
        setWorkshops(mapped);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch nearby workshops:', err);
        setError('Failed to load nearby workshops');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [userLocation, token]);

  return {
    workshops,
    loading: loading || locationLoading,
    error,
    userLocation,
  };
}
