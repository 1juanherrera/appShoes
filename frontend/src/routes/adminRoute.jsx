import React from "react";
import { Navigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";
import { getToken } from "../store/session";

const AdminRoute = ({ children }) => {
  const { user } = useUserData();
  const token = getToken();

  if ( !token && !user && user.rol != "ADMINISTRADOR") {
    
    return <Navigate to="/error" />
  }

  return children;
};

export default AdminRoute;