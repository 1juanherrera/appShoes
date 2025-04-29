import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductosPorCategoria } from "../api/categorias";
import { useCarrito } from "../hooks/useCarrito";
import { Carrito } from "./Carrito";

export const ProductosCategoria = () => {
  const { id } = useParams(); // Obtén el ID de la categoría desde la URL
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito, } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await obtenerProductosPorCategoria(id);
        if (response.success) {
          setProductos(response.data); // Guardar los productos en el estado
        } else {
          throw new Error(response.error.message || "Error al obtener productos");
        }
      } catch (err) {
        console.error("Error al obtener productos:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    if (id) {
      fetchProductos(); // Llama a la función solo si `id` está definido
    }
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-800">Productos de la Categoría</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
          > 
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <strong className="text-lg font-semibold text-gray-800">{producto.nombre}</strong>
            <p className="text-sm text-gray-600 mt-2">{producto.descripcion}</p>
            <p className="text-lg font-bold text-green-600 mt-2">Precio: ${producto.precio}</p>
            <p className="text-sm text-gray-500 mt-1">Stock: {producto.stock}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar al Carrito
              </button>
            </div>
          </li>
        ))}
      </ul> 
      </div>
  );
};