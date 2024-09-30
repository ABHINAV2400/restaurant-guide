import React, { useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Restaurant } from '../../types/Restaurant';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  center: {
    lat: number;
    lng: number;
  };
}

const containerStyle = {
  width: '100%',
  height: '600px',
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  center,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]); // Updated type

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    mapIds: ['f48fe30bbff5be76'],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!isLoaded || loadError) {
      if (loadError) {
        console.error('Google Maps API failed to load:', loadError);
      }
      return;
    }

    const addMarkers = async () => {
      if (!mapRef.current) return;

      try {
        // Import the marker library which includes AdvancedMarkerElement
        const markerLibrary = await google.maps.importLibrary('marker');
        const { AdvancedMarkerElement } =
          markerLibrary as typeof google.maps.marker;
        markersRef.current = [];

        // Add new markers
        restaurants.forEach((restaurant) => {
          const { latitude, longitude, name } = restaurant;

          const marker = new AdvancedMarkerElement({
            map: mapRef.current!,
            position: { lat: latitude, lng: longitude },
            title: name,
          });

          markersRef.current.push(marker);
        });
      } catch (error) {
        console.error('Error initializing AdvancedMarkerElements:', error);
      }
    };

    addMarkers();

    // Cleanup function to remove markers when component unmounts or before adding new ones
    return () => {
      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];
      markersRef.current = [];
    };
  }, [isLoaded, loadError, restaurants]);

  if (loadError) {
    return <div>Error loading map: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      options={{ mapId: 'f48fe30bbff5be76' }}
    />
  );
};

export default React.memo(RestaurantMap);
