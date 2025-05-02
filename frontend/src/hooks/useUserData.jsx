import { useCallback, useEffect, useState } from "react";
import { getUserData, updateUserData } from "../services/authService"; // Importa las funciones necesarias

export const useUserData = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [error, setError] = useState(""); // Estado para manejar errores
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getUserData(); // Llama a la función asíncrona para obtener los datos
      setUser(data);
    } catch (err) {
      console.error("Error al obtener los datos del usuario:", err.message);
      setError("No se pudieron obtener los datos del usuario.");
    } finally {
      setIsLoading(false);
    }
  }

  const refetchUserData = useCallback(async () => {
    await fetchUserData();
  }, []);

  // Función para actualizar los datos del usuario
  const updateUser = async (updatedData) => {
    setIsLoading(true);
    setError("");
    try {
      const updatedUser = await updateUserData(updatedData); // Llama a la función asíncrona para actualizar los datos
      setUser(updatedUser); // Actualiza el estado con los datos actualizados
    } catch (err) {
      console.error("Error al actualizar los datos del usuario:", err.message);
      setError("No se pudieron actualizar los datos del usuario.");
    } finally {
      setIsLoading(false);
    }
  }

  // Efecto para obtener los datos del usuario al cargar el componente
  useEffect(() => {
    fetchUserData();
  }, [])

  const isAdmin = user?.rol === "ADMINISTRADOR"; // Verifica si el usuario es administrador

  return {
    user,
    error,
    isAdmin,
    isLoading,
    fetchUserData, // Exporta la función para obtener los datos
    updateUser, // Exporta la función para actualizar los datos
    refetchUserData
    
  }
}