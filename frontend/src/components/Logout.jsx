import React from "react";
import { clearToken } from "../store/session"; 
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

const Logout = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleLogout = () => {
    try {
      clearToken(); // Elimina el token del almacenamiento
      console.log("Sesión cerrada exitosamente");
      navigate("/login"); // Redirige al usuario al login
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
    }
  };

  return (
    <button onClick={handleLogout} className="hover:underline cursor-pointer text-red-500 logout">
      <IoMdExit />
    </button>
  );
}

export default Logout;