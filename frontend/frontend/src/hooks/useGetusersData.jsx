import { useEffect, useState } from "react";
import { getUserData } from "../auth/authService"; 

export const useGetUsersData = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Llama a la función asíncrona
        setUser(data);
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err.message);
        setError("No se pudieron obtener los datos del usuario.");
      }
    };

    fetchUserData();
  }, []);

  return {
    user, 
    error
  }
}