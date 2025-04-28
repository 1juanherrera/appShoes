import React from "react";
import { logout } from "../auth/authService";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Sesión cerrada exitosamente");
      window.location.reload(); // Recarga la página para limpiar el estado
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  );
}

export default Logout;