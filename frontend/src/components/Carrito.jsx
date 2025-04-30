import { useCarrito } from "../hooks/useCarrito";
import { FaTrashAlt } from "react-icons/fa";

export const Carrito = () => {
  const {
    carrito,
    loading,
    error,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad,
  } = useCarrito();

  if (loading) return <p className="text-center text-gray-500">Cargando carrito...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carrito.map((item) => (
            <div
              key={item.producto.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-bold text-gray-800">{item.producto.nombre}</h2>
              <img
                src={item.producto.imagen}
                alt={item.producto.nombre}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{item.producto.descripcion}</p>

              <div className="flex items-center justify-between mb-4">
                <p
                  className={`text-sm font-medium ${
                    item.producto.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.producto.stock > 0 ? "Disponible" : "No disponible"}
                </p>
                <p className="text-sm text-gray-500">Stock: {item.producto.stock}</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-green-700">${item.producto.precio}</p>
                <button
                  onClick={() => eliminarDelCarrito(item.producto.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <FaTrashAlt className="text-2xl" />
                </button>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() =>
                    actualizarCantidad(item.producto.id, item.cantidad - 1)
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <p className="mx-4 text-lg font-medium">{item.cantidad}</p>
                <button
                  onClick={() =>
                    actualizarCantidad(item.producto.id, item.cantidad + 1)
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={item.cantidad >= item.producto.stock}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={vaciarCarrito}
        className="bg-red-600 text-white fixed bottom-10 right-5 rounded-lg hover:bg-red-700 transition-colors px-4 py-2 flex items-center"
      >
        <FaTrashAlt size={15} />
        <span className="ml-2">Vaciar Carrito</span>
      </button>
    </div>
  );
};