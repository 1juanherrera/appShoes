import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductosPorCategoria } from "../api/categorias";
import { useProductos } from "../hooks/useProductos";
import { Producto } from "./Producto";

export const ProductosCategoria = () => {
  const { id } = useParams();
  const { productos, setProductos, agregarAlCarrito } = useProductos();
  const [nombreCategoria, setNombreCategoria] = useState(""); // Estado para el nombre de la categoría

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await obtenerProductosPorCategoria(id);
        console.log("Respuesta de la API:", response); // Depuración
        if (response.success) {
          setProductos(response.data);
          setNombreCategoria(response.data[0]?.categoria?.nombre || "Categoría desconocida"); // Accede al nombre de la categoría
        } else {
          throw new Error(response.error.message || "Error al obtener productos");
        }
      } catch (err) {
        console.error("Error al obtener productos:", err.message);
      }
    };

    if (id) {
      fetchProductos();
    }
  }, [id, setProductos]);

  return (
    <div className="container productos-categorias">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Productos de la Categoría: <span className="text-blue-700">{nombreCategoria}</span>
      </h1>
      <Producto
        productos={productos}
        onAgregarAlCarrito={agregarAlCarrito}
      />
    </div>
  );
};