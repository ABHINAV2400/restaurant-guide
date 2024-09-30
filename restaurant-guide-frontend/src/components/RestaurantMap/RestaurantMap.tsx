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
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    mapIds: ['f48fe30bbff5be76'],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const addMarkers = async () => {
    if (!mapRef.current) return;

    // Cleanup existing markers before adding new ones
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    try {
      const markerLibrary = await google.maps.importLibrary('marker');
      const { AdvancedMarkerElement } =
        markerLibrary as typeof google.maps.marker;

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

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      addMarkers(); // Add markers after the map is loaded
    }
  }, [isLoaded, restaurants]); // Now it only runs on changes to restaurants or map load

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
