import React from "react";
import { Navigate } from "react-router-dom";
import { getUserData } from "../auth/authService"; 
import { getToken } from "../utils/session";

const AdminRoute = ({ children }) => {
  const user = getUserData(); 
  const token = getToken();

  if ( !token || !user || user.rol !== "ADMINISTRADOR") {
    // Si no está autenticado o no es administrador, redirige al login
    return <Navigate to="/error" />;
  }

  return children; // Si es administrador, renderiza el contenido
};

export default AdminRoute;