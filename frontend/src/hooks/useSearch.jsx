import { useState, useEffect } from "react";

export const useSearch = (productos) => {
  const [filteredProducts, setFilteredProducts] = useState(productos);

  useEffect(() => {
    setFilteredProducts(productos);
  }, [productos]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(lowerQuery) ||
        producto.descripcion.toLowerCase().includes(lowerQuery) ||
        producto.precio.toString().includes(query) ||
        (producto.categoriaId && producto.categoriaId.toString().includes(query))
    );
    setFilteredProducts(filtered);
  };

  return {
    handleSearch,
    filteredProducts,
  };
};