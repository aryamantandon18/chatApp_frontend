import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  // If user is authenticated, render children; otherwise redirect to login
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;