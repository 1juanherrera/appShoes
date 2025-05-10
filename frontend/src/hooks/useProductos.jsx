import { useState, useEffect } from "react";
import request from "../api/apiClient";

export const useProductos = (initialProductos = []) => {
  const [productos, setProductos] = useState(initialProductos);
  const [filteredProductos, setFilteredProductos] = useState(initialProductos);
  const [carrito, setCarrito] = useState([]);

  // Obtener el carrito desde el backend al cargar el componente
  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await request("/carrito", "GET", null, true);
        if (response.success) {
          setCarrito(response.data.items || []);
        } else {
          console.error("Error al obtener el carrito:", response.error.message);
        }
      } catch (err) {
        console.error("Error al cargar el carrito:", err);
      }
    };

    fetchCarrito();
  }, []);

  // Sincronizar productos filtrados con productos originales
  useEffect(() => {
    setFilteredProductos(productos);
  }, [productos]);

  //  Manejar la búsqueda
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(lowerQuery) ||
        producto.descripcion.toLowerCase().includes(lowerQuery) ||
        producto.precio.toString().includes(query) ||
        (producto.categoriaId && producto.categoriaId.toString().includes(query))
    );
    setFilteredProductos(filtered);
  };

  // Agregar un producto al carrito
  const agregarAlCarrito = async (producto) => {
    try {
      const response = await request(
        "/carrito/items",
        "POST",
        { productoId: producto.id, cantidad: 1 },
        true
      );

      if (response.success) {
        setCarrito(response.data.items || []); // Actualiza el carrito con los datos del servidor
        return "Producto agregado al carrito";
      } else {
        return response.error.message || "Error al agregar el producto al carrito";
      }
    } catch (err) {
      console.error("Error al agregar el producto al carrito:", err);
      return "Error al agregar el producto al carrito";
    }
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = async (id) => {
    try {
      const response = await request(`/carrito/items/${id}`, "DELETE", null, true);

      if (response.success) {
        setCarrito(response.data.items || []); // Actualiza el carrito con los datos del servidor
        return "Producto eliminado del carrito";
      } else {
        return response.error.message || "Error al eliminar el producto del carrito";
      }
    } catch (err) {
      console.error("Error al eliminar el producto del carrito:", err);
      return "Error al eliminar el producto del carrito";
    }
  };

  // Vaciar el carrito
  const vaciarCarrito = async () => {
    try {
      const response = await request("/carrito", "DELETE", null, true);

      if (response.success) {
        setCarrito([]); // Vacía el carrito localmente
        return "Carrito vaciado correctamente";
      } else {
        return response.error.message || "Error al vaciar el carrito";
      }
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
      return "Error al vaciar el carrito";
    }
  };

  return {
    productos,
    setProductos,
    filteredProductos,
    handleSearch,
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  };
};