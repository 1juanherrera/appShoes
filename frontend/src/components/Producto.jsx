import { useEffect, useState } from "react";
import request from "../api/apiClient";

export const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await request("/productos", "GET");
        setProductos(data.data);
        // console.log(data.data)
      } catch (err) {
        setError("Error al cargar los productos");
      }
    }

    fetchProductos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p className="text-green-500 font-bold">${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}