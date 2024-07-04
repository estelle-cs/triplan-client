import React from 'react';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({ element }) => {
  const token = localStorage.getItem('token');

  return token ? element : <Navigate to="/login" />;
};

export default RouteGuard;
