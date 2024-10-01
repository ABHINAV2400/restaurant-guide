// src/pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { getAllRestaurants } from '../../services/apiService';
import { Restaurant } from '../../types/Restaurant';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import Loader from '../../components/common/Loader';
import RatingFilter from '../../components/RatingFilter/RatingFilter';
import RestaurantMap from '../../components/RestaurantMap/RestaurantMap'; // Import the map component
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(1); // Default minimum rating is 1

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Filter restaurants based on the selected minimum rating
  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.rating >= minRating
  );

  // Define the map center based on the first restaurant in the list or a default location
  const mapCenter = {
    lat: filteredRestaurants[0]?.latitude || 59.3293, // Example: Stockholm's latitude
    lng: filteredRestaurants[0]?.longitude || 18.0686, // Example: Stockholm's longitude
  };

  return (
    <div className={styles.container}>
      <RatingFilter minRating={minRating} setMinRating={setMinRating} />
      <div className={styles.restaurantList}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants</p>
        )}
      </div>
      <RestaurantMap restaurants={filteredRestaurants} center={mapCenter} />
    </div>
  );
};

export default Home;