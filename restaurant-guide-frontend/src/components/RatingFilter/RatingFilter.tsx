// src/components/RatingFilter/RatingFilter.tsx
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './RatingFilter.module.css';

interface RatingFilterProps {
  minRating: number;
  setMinRating: (rating: number) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  minRating,
  setMinRating,
}) => {
  // Handle slider change event
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(event.target.value)); // Set the selected rating from the slider
  };

  // Render stars based on the minimum rating
  const renderStars = () => {
    const fullStars = Math.floor(minRating);
    const halfStar = minRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} color="#FFD700" className={styles.starIcon} />
      );
    }

    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" color="#FFD700" className={styles.starIcon} />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          color="#FFD700"
          className={styles.starIcon}
        />
      );
    }

    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.stars}>{renderStars()}</div>
      <input
        type="range"
        min="1"
        max="5"
        step="0.1" // Allows fractional values like 4.2, 4.5, etc.
        value={minRating}
        onChange={handleSliderChange}
        className={styles.slider}
      />
      <div className={styles.ratingValue}>Rating: {minRating.toFixed(1)}</div>
    </div>
  );
};

export default RatingFilter;
