import { useState, useEffect } from "react";

export const useCarrito = () => {
  // Inicializar el carrito desde sessionStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = sessionStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Sincronizar el carrito con sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        alert("El producto ya está en el carrito");
        return prevCarrito;
      }
      return [...prevCarrito, producto];
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  };
};  