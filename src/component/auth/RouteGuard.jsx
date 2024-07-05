import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const RouteGuard = ({ element }) => {
  const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.sub;
    } catch (error) { 
      console.error('Error decoding token:', error);
      return <Navigate to="/login" />;
    }
  }

  if (!userId) {
    return <Navigate to="/welcome" />;
  }

  const elementWithUserId = React.cloneElement(element, { userId});

  return elementWithUserId;
};

export default RouteGuard;