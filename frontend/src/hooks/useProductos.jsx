import { useState, useEffect } from "react";

export const useProductos = (initialProductos = []) => {
  const [productos, setProductos] = useState(initialProductos);
  const [filteredProductos, setFilteredProductos] = useState(initialProductos);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = sessionStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Sincronizar el carrito con sessionStorage
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Sincronizar productos filtrados con productos originales
  useEffect(() => {
    setFilteredProductos(productos);
  }, [productos]);

  // Función para manejar la búsqueda
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

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    let mensaje = "Producto agregado al carrito";
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        mensaje = "El producto ya está en el carrito";
        return prevCarrito;
      }
      return [...prevCarrito, producto];
    });
    return mensaje; // Devuelve el mensaje correspondiente
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
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