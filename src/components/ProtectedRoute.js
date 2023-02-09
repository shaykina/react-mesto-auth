import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.isLoggedIn ? Component : <Navigate to="/signin" replace />
  )
}

export default ProtectedRouteElement;
