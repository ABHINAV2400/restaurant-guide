import axios from 'axios';
import { Restaurant } from '../types/Restaurant';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(`${API_BASE_URL}/restaurants`);
  return response.data;
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
  return response.data;
};
