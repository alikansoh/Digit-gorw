// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const sessionData = sessionStorage.getItem('user');
  return (
    sessionData
      ? children
      : <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
