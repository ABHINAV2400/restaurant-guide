// src/services/googlePlacesService.ts
import axios from 'axios';
import { Restaurant } from '../types/Restaurant';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY as string;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const DEFAULT_LOCATION = process.env.DEFAULT_LOCATION || '40.712776,-74.005974';
const DEFAULT_RADIUS = parseInt(process.env.DEFAULT_RADIUS || '1500', 10);

/**
 * Fetch all restaurants using Google Places API.
 */
export const fetchAllRestaurants = async (
  location: string = DEFAULT_LOCATION,
  radius: number = DEFAULT_RADIUS,
  keyword: string = 'restaurant'
) : Promise<Restaurant[]> => {
  // const cacheKey = `all_${location}_${radius}_${type}`;
  // const cachedData = cache.get<Restaurant[]>(cacheKey);
  // if (cachedData) {
  //   return cachedData;
  // }

  const url = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json`;
  const params = {
    location,
    radius: radius.toString(),
    keyword,
    key: GOOGLE_PLACES_API_KEY,
  };

  const response = await axios.get(url, { params });

  const results = response.data.results;

  const restaurants: Restaurant[] = results.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    address: place.vicinity,
    phone: '', // To be fetched separately if needed
    rating: place.rating,
    photos: place.photos
      ? place.photos.map(
          (photo: any) =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        )
      : [],
    website: place.website || '',
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    // Add other fields as needed
  }));
  
  // cache.set(cacheKey, restaurants);
  return restaurants;
};

/**
 * Fetch a single restaurant by its Place ID using Google Places API.
 */
export const fetchRestaurantById = async (placeId: string): Promise<Restaurant | null> => {
  // const cacheKey = `detail_${placeId}`;
  // const cachedData = cache.get<Restaurant>(cacheKey);
  // if (cachedData) {
  //   return cachedData;
  // }

  const url = `${GOOGLE_PLACES_BASE_URL}/details/json`;
  const params = {
    key: GOOGLE_PLACES_API_KEY,
    place_id: placeId,
    fields: 'name,formatted_address,formatted_phone_number,rating,photos,website',
  };

  const response = await axios.get(url, { params });
  const result = response.data.result;

  if (!result) return null;

  const restaurant: Restaurant = {
    id: result.place_id,
    name: result.name,
    address: result.formatted_address,
    phone: result.formatted_phone_number || '',
    rating: result.rating,
    photos: result.photos
      ? result.photos.map(
          (photo: any) =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        )
      : [],
    website: result.website || '',
    latitude: result.latitude,
    longitude: result.longitude,
    
    // Add other fields as needed
  };

  // cache.set(cacheKey, restaurant);
  return restaurant;
};
