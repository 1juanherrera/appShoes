import React from "react";
import { useCarrito } from "../hooks/useCarrito";

export const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Tu Carrito</h1>
      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carrito.map((producto) => (
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
                <button
                  onClick={() => eliminarDelCarrito(producto.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={vaciarCarrito}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};