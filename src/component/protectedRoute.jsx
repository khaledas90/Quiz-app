import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const dataUser = useSelector((state) => state.user.userData);
  let location = useLocation();
  console.log(dataUser);
  if (dataUser && dataUser.length > 0) {
    return children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}
