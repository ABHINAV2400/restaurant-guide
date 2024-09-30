// src/components/RestaurantCard/RestaurantCard.tsx
import React, { useState } from 'react';
import { Restaurant } from '../../types/Restaurant';
import RestaurantDetail from '../RestaurantDetail/RestaurantDetail';
import styles from './RestaurantCard.module.css';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.card}>
      {restaurant.photos.length > 0 && (
        <img
          src={restaurant.photos[0]}
          alt={restaurant.name}
          className={styles.image}
        />
      )}
      <div className={styles.info}>
        <h2>{restaurant.name}</h2>
        <button onClick={toggleDetails} className={styles.link}>
          View Details
        </button>
        {showDetails && (
          <RestaurantDetail
            restaurantId={restaurant.id}
            onClose={toggleDetails}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
