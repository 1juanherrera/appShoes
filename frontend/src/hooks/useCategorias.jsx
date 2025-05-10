import { useState, useEffect } from "react";
import { listarCategorias } from "../api/categorias";
import { useNavigate } from "react-router-dom";

export const useCategorias = () => {

    const [categorias, setCategorias] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const response = await listarCategorias();
          if (response.success) {
            setCategorias(response.data); 
          } else {
            throw new Error(response.error.message || "Error al obtener categorías");
          }
        } catch (err) {
          console.error("Error al obtener categorías:", err.message);
          setError(err.message);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchCategorias();
    }, []);
  
    const handleCategoriaClick = (id) => {
      navigate(`/productos/categoria/${id}`); 
    };

  return { categorias, loading, error, handleCategoriaClick };
};