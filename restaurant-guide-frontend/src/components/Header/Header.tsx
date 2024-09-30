import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Stockholm Culinary Explorer</h1>
    <p className={styles.description}>
      Discover the Allure of Stockholm: A Hub of Tourism and Culinary Diversity
    </p>
  </header>
);

export default Header;
