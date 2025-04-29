import { useEffect } from "react";
import request from "../api/apiClient";
import { useProductos } from "../hooks/useProductos";
import { Producto } from "./Producto";
import { Search } from "./Search";

export const ListaProductos = () => {
  const {
    productos,
    setProductos,
    filteredProductos,
    handleSearch,
    agregarAlCarrito,
  } = useProductos();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await request("/productos", "GET");
        setProductos(data.data);
        console.log(productos);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProductos();
  }, [setProductos]);

  console.log(productos);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-3xl font-bold mb-5">
        Lista de Productos
      </h3>
      <Search onSearch={handleSearch} />
      <Producto
        productos={filteredProductos}
        onAgregarAlCarrito={agregarAlCarrito}
      />
    </div>
  );
};