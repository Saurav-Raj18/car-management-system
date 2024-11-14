import React from 'react';
import { useSelector } from 'react-redux';  // Assuming you are using Redux
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Assuming you store the authentication status in the Redux state
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log(isAuthenticated)

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, allow access to the child route
  return children;
};

export default ProtectedRoute;
