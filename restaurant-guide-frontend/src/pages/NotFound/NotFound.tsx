import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => (
  <div className={styles.container}>
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go Back Home</Link>
  </div>
);

export default NotFound;
