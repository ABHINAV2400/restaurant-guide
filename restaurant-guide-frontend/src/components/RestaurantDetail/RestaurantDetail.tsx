// src/components/RestaurantDetail/RestaurantDetail.tsx
import React, { useEffect, useState } from 'react';
import { getRestaurantById } from '../../services/apiService';
import { Restaurant } from '../../types/Restaurant';
import styles from './RestaurantDetail.module.css';

interface RestaurantDetailProps {
  restaurantId: string;
  onClose: () => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurantId,
  onClose,
}) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(restaurantId);
        if (data) {
          setRestaurant(data);
        } else {
          setError('Restaurant not found.');
        }
      } catch (err) {
        console.error('Error fetching restaurant details:', err);
        setError('Failed to load restaurant details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  if (isLoading) {
    return null; // Do not render anything while loading
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!restaurant) {
    return <div className={styles.error}>Restaurant not found.</div>;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>{restaurant.name}</h1>
        {restaurant.photos.length > 0 && (
          <img
            src={restaurant.photos[0]}
            alt={restaurant.name}
            className={styles.image}
          />
        )}
        <div className={styles.details}>
          <p>
            <strong>Address:</strong> {restaurant.address}
          </p>
          <p>
            <strong>Phone:</strong> {restaurant.phone || 'N/A'}
          </p>
          <p>
            <strong>Rating:</strong> {restaurant.rating}
          </p>
          {restaurant.website && (
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                {restaurant.website}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
