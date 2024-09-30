export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  photos: string[];
  website?: string;
  latitude: number;
  longitude: number;
  // Add other fields as needed
}