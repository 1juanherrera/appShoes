import React, { useEffect, useState } from "react";
import { getUserData } from "../auth/authService";

export const Profile = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Llama a la función asíncrona
        setUser(data); // Almacena los datos del usuario en el estado
        // console.log(data); // Muestra los datos en la consola para depuración
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err.message);
        setError("No se pudieron obtener los datos del usuario.");
      }
    };

    fetchUserData();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  if (error) {
    return <p className="text-red-500">{error}</p>; // Muestra un mensaje de error si ocurre
  }

  if (!user) {
    return <p>Cargando datos del usuario...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      <p>Bienvenido, {user.nombre} ({user.email})</p>
      <p>{user.apellidos} {user.contacto} {user.direccion} {user.nombreUsuario}</p>
      <p>Aquí puedes gestionar los usuarios.</p>
    </div>
  );
};
