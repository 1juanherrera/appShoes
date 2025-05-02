import { useState } from "react";
import { useCarrito } from "../hooks/useCarrito";
import { crearOrden } from "../services/ordenServices"; 
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Message } from "./Message";

export const Carrito = () => {

  const {
    carrito,
    loading,
    error,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad,
  } = useCarrito();

  const [mensaje, setMensaje] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const navigate = useNavigate();

  const handleCrearOrden = async () => {
    try {
      const respuesta = await crearOrden();
      setMensaje("Orden creada con éxito");
      setTipoMensaje("success");
      setMensajeVisible(true);
      setTimeout(() => {
        navigate("/ordenes");
      }, 2000);
    } catch (err) {
      setMensaje(err.response?.data?.message || "Error al crear la orden");
      setTipoMensaje("error");
      setMensajeVisible(true);
    }
  };

  const handleEliminarDelCarrito = async (id) => {
    const mensaje = await eliminarDelCarrito(id);
    setMensaje(mensaje);
    setTipoMensaje(mensaje === "Producto eliminado del carrito" ? "success" : "error");
    setMensajeVisible(true);
  };

  const handleVaciarCarrito = async () => {
    const mensaje = await vaciarCarrito();
    setMensaje(mensaje);
    setTipoMensaje(mensaje === "Carrito vaciado correctamente" ? "success" : "error");
    setMensajeVisible(true);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando carrito...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <Message
        mensaje={mensaje}
        tipo={tipoMensaje}
        visible={mensajeVisible}
        onClose={() => setMensajeVisible(false)}
      />

      <h1 className="text-3xl font-bold text-center my-6 text-blue-800 pb-5">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carrito.map((item) => (
            <div
              key={item.producto.id}
              className="p-4 bg-white border mb-5 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-bold text-gray-800">{item.producto.nombre}</h2>
              <img
                src={item.producto.imagen}
                alt={item.producto.nombre}
                className="min-w-full h-50 object-cover mb-4"
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
                  onClick={() => handleEliminarDelCarrito(item.producto.id)}
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
          onClick={handleVaciarCarrito}
          className="bg-red-600 fixed bottom-5 flex-col left-2 text-white hover:bg-red-700 w-20 h-20 rounded-circle flex items-center justify-center"
        >
          <FaTrashAlt size={25} />
          <span className="text-md">Vaciar</span>
        </button>
        <button
          onClick={handleCrearOrden}
          className="bg-blue-600 fixed bottom-5 flex-col right-2 text-white hover:bg-blue-700 w-20 h-20 rounded-circle flex items-center justify-center"
        >
          <IoMdAdd size={35}/>
          <span className="">Orden</span>
        </button>
      </div>
  )
}