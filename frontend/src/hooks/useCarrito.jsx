import { useState, useEffect } from "react";
import request from "../api/apiClient";

export const useCarrito = () => {
  const [carrito, setCarrito] = useState([]); // Carrito con productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Obtener el carrito del usuario
  const obtenerCarrito = async () => {
    setLoading(true);
    try {
      const response = await request("/carrito", "GET", null, true);
      if (response.success) {
        setCarrito(response.data.items || []); // Asignar los productos del carrito
      } else {
        setError(response.error?.message || "Error al obtener el carrito.");
      }
    } catch (err) {
      setError("Error al obtener el carrito.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un producto al carrito
  const agregarAlCarrito = async (productoId, cantidad) => {
    try {
      const response = await request(
        "/carrito/items",
        "POST",
        { productoId, cantidad },
        true
      );

      if (response.success) {
        setCarrito(response.data.items || []);
        return "Producto agregado al carrito"; // Mensaje de éxito
      } else {
        return response.error?.message || "Error al agregar el producto al carrito";
      }
    } catch (err) {
      console.error("Error al agregar el producto al carrito:", err);
      return "Error al agregar el producto al carrito";
    }
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = async (productoId, nuevaCantidad) => {
    try {
      const producto = carrito.find((item) => item.producto.id === productoId);
      if (!producto) {
        setError("Producto no encontrado en el carrito.");
        return;
      }

      const diferencia = nuevaCantidad - producto.cantidad;

      const response = await request(
        `/carrito/items/${productoId}`,
        "PUT",
        { cantidad: nuevaCantidad },
        true
      );

      if (response.success) {
        setCarrito((prevCarrito) =>
          prevCarrito.map((item) =>
            item.producto.id === productoId
              ? {
                  ...item,
                  cantidad: nuevaCantidad,
                  producto: {
                    ...item.producto,
                    stock: item.producto.stock - diferencia,
                  },
                }
              : item
          )
        );
      } else {
        setError(response.error?.message || "Error al actualizar la cantidad del producto.");
      }
    } catch (err) {
      setError("Error al actualizar la cantidad del producto.");
      console.error(err);
    }
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = async (productoId) => {
    try {
      const producto = carrito.find((item) => item.producto.id === productoId);
      if (!producto) {
        return "Producto no encontrado en el carrito"; // Mensaje de error
      }

      const response = await request(`/carrito/items/${productoId}`, "DELETE", null, true);

      if (response.success) {
        setCarrito((prevCarrito) =>
          prevCarrito.filter((item) => item.producto.id !== productoId)
        );
        return "Producto eliminado del carrito"; // Mensaje de éxito
      } else {
        return response.error?.message || "Error al eliminar el producto del carrito";
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
        setCarrito([]); // Vaciar el carrito
        return "Carrito vaciado correctamente"; // Mensaje de éxito
      } else {
        return response.error?.message || "Error al vaciar el carrito";
      }
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
      return "Error al vaciar el carrito";
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, []);

  return {
    carrito,
    loading,
    error,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  }
}