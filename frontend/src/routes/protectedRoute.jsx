import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../store/session";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/error" />;
  }

  return children; // Si hay token, renderiza el contenido
};

export default ProtectedRoute;