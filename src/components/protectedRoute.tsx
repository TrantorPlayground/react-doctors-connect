import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
