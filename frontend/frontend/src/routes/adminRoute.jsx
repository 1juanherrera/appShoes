import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUsersData } from "../hooks/useGetusersData";
import { getToken } from "../utils/session";

const AdminRoute = ({ children }) => {
  const { user } = useGetUsersData();
  const token = getToken();

  if ( !token && !user && user.rol != "ADMINISTRADOR") {
    
    return <Navigate to="/error" />
  }

  return children;
};

export default AdminRoute;