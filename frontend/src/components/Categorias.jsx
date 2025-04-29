import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { listarCategorias } from "../api/categorias";

export const Categorias = () => {
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate(); // Hook para redirigir

  // Obtener todas las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await listarCategorias();
        if (response.success) {
          setCategorias(response.data); // Guardar las categorías en el estado
        } else {
          throw new Error(response.error.message || "Error al obtener categorías");
        }
      } catch (err) {
        console.error("Error al obtener categorías:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchCategorias();
  }, []);

  // Manejar clic en una categoría para redirigir a la página de productos
  const handleCategoriaClick = (id) => {
    navigate(`/productos/categoria/${id}`); // Redirige al enlace con el ID de la categoría
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Lista de Categorías</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between hover:shadow-lg transition-shadow"
          >
            <p className="text-lg font-semibold text-gray-800">{categoria.nombre}</p>
            <button
              onClick={() => handleCategoriaClick(categoria.id)} // Llama a la función para redirigir
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Productos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};