import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/Header/Header';

const App: React.FC = () => (
  <Router>
    <Header />
    <AppRoutes />
  </Router>
);

export default App;
