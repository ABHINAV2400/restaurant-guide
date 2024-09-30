"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRestaurantById = exports.fetchAllRestaurants = void 0;
// src/services/googlePlacesService.ts
const axios_1 = __importDefault(require("axios"));
// import Cache from '../utils/cache';
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const DEFAULT_LOCATION = process.env.DEFAULT_LOCATION || '40.712776,-74.005974';
const DEFAULT_RADIUS = parseInt(process.env.DEFAULT_RADIUS || '1500', 10);
// const CACHE_TTL = 1000 * 60 * 60; // 1 hour
// const cache = new Cache(CACHE_TTL);
/**
 * Fetch all restaurants using Google Places API.
 */
const fetchAllRestaurants = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (location = DEFAULT_LOCATION, radius = DEFAULT_RADIUS, keyword = 'restaurant') {
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
    const response = yield axios_1.default.get(url, { params });
    const results = response.data.results;
    console.log("result", results);
    const restaurants = results.map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        phone: '', // To be fetched separately if needed
        rating: place.rating,
        photos: place.photos
            ? place.photos.map((photo) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`)
            : [],
        website: place.website || '',
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        // Add other fields as needed
    }));
    // cache.set(cacheKey, restaurants);
    return restaurants;
});
exports.fetchAllRestaurants = fetchAllRestaurants;
/**
 * Fetch a single restaurant by its Place ID using Google Places API.
 */
const fetchRestaurantById = (placeId) => __awaiter(void 0, void 0, void 0, function* () {
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
    const response = yield axios_1.default.get(url, { params });
    const result = response.data.result;
    if (!result)
        return null;
    const restaurant = {
        id: result.place_id,
        name: result.name,
        address: result.formatted_address,
        phone: result.formatted_phone_number || '',
        rating: result.rating,
        photos: result.photos
            ? result.photos.map((photo) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`)
            : [],
        website: result.website || '',
        latitude: result.latitude,
        longitude: result.longitude,
        // Add other fields as needed
    };
    // cache.set(cacheKey, restaurant);
    return restaurant;
});
exports.fetchRestaurantById = fetchRestaurantById;
