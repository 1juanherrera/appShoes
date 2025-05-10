import { useCallback, useEffect, useState } from "react";
import { getUserData, updateUserData } from "../services/authService"; 

export const useUserData = () => {
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getUserData();
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

  // Actualizar los datos del usuario
  const updateUser = async (updatedData) => {
    setIsLoading(true);
    setError("");
    try {
      const updatedUser = await updateUserData(updatedData); 
      setUser(updatedUser); 
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
    fetchUserData, 
    updateUser, 
    refetchUserData
    
  }
}