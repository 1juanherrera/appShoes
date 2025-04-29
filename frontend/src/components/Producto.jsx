import { useEffect, useState } from "react";
import request from "../api/apiClient";
import { useSearch } from "../hooks/useSearch";
import { Search } from "./Search";  

export const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const { handleSearch, filteredProducts } = useSearch(productos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await request("/productos", "GET");
        setProductos(data.data);
      } catch (err) {
        setError("Error al cargar los productos");
      }
    }

    fetchProductos();
  }, []);

  console.log(filteredProducts);


  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Lista de Productos</h3>
      {error && <p className="text-red-500">{error}</p>}
      <Search onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filteredProducts.map((producto) => (
          <div key={producto.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} className="w-full   object-cover mb-2" />
            <p>{producto.descripcion}</p>
            <p className="text-green-500 font-bold">${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <p>Categoría ID: {producto.categoriaId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};