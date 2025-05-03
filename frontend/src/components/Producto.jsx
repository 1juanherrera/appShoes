import { Link } from "react-router-dom";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { Message } from "./Message";

export const Producto = ({ productos = [], onAgregarAlCarrito }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("error"); // Estado para el tipo de mensaje
  const [contadorCarrito, setContadorCarrito] = useState({}); // Estado para el contador del carrito

  const handleAgregarAlCarrito = async (producto) => {
    const mensaje = await onAgregarAlCarrito(producto); // Obtén el mensaje del hook
    setMensaje(mensaje); // Establece el mensaje
    setTipoMensaje(mensaje === "Producto agregado al carrito" ? "success" : "error"); // Determina el tipo de mensaje
    setMensajeVisible(true); // Muestra el mensaje

    if (mensaje === "Producto agregado al carrito") {
      // Incrementa el contador del carrito para este producto
      setContadorCarrito((prev) => ({
        ...prev,
        [producto.id]: (prev[producto.id] || 0) + 1,
      }));
    }
  };

  return (
    <>
      <Message
        mensaje={mensaje}
        tipo={tipoMensaje} // Pasa el tipo de mensaje
        visible={mensajeVisible}
        onClose={() => setMensajeVisible(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {productos.map((producto) => (
          <Link
            to={`/producto/${producto.id}`}
            key={producto.id}
            className="p-4 border text-decoration-none rounded shadow mb-5 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              <h2 className="text-lg font-bold hover:text-blue-600 text-black">{producto.nombre}</h2>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="min-w-full h-50 object-cover mb-2"
              />
              <p className="text-black">{producto.descripcion}</p>

              <div className="flex items-center justify-between mb-4">
                <p className="m-0 text-blue-700 font-medium">
                  {!producto.activo ? "No activo" : "Activo"}
                </p>
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full text-black ${
                      producto.stock <= 0 ? "bg-red-700" : "bg-green-700"
                    }`}
                  ></div>
                  <p className="m-0 p-2 ">
                    {producto.stock <= 0 ? "No disponible" : "Disponible"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-green-700 font-bold text-4xl m-0">$ {producto.precio}</p>
                <div className="flex items-center relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Evita que el clic en el botón redirija al detalle
                      handleAgregarAlCarrito(producto);
                    }}
                    className="text-blue-700 px-4 py-2 rounded-full mt-2 flex items-center"
                  >
                    <MdAddShoppingCart className="text-4xl" />
                  </button>
                  {contadorCarrito[producto.id] > 0 && (
                    <span className="ml-2 text-md font-bold text-white bg-red-700 rounded-full p-1 h-6 w-6 absolute top-1 right-2 transform flex items-center justify-center">
                      {contadorCarrito[producto.id]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};