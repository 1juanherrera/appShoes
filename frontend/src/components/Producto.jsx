import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { Message } from "./Message";

export const Producto = ({ productos = [], onAgregarAlCarrito }) => {

  const [mensaje, setMensaje] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const handleAgregarAlCarrito = async (producto) => {
    const mensaje = await onAgregarAlCarrito(producto); // Obtén el mensaje del hook
    setMensaje(mensaje); // Establece el mensaje
    setMensajeVisible(true); // Muestra el mensaje
  };
  
  return (
    <>  <Message
    mensaje={mensaje}
    visible={mensajeVisible}
    onClose={() => setMensajeVisible(false)} 
  />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
       
      {productos.map((producto) => (
        <div key={producto.id} className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold">{producto.nombre}</h2>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="min-w-full h-50 object-cover mb-2"
          />
          <p>{producto.descripcion}</p>
          

          <div className="flex items-center justify-between mb-4">
            <p className="m-0 text-blue-700 font-medium">{!producto.activo ? "No activo" : "Activo"}</p>
            <div className="flex items-center">
              <div className={`h-5 w-5 rounded-full ${producto.stock <= 0 ? "bg-red-700" : "bg-green-700"}`}></div>
              <p className="m-0 p-2">{producto.stock <= 0 ? "No disponible" : "Disponible"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
              <p className="text-green-700 font-bold text-4xl m-0">$ {producto.precio}</p>
              <button
                onClick={() => handleAgregarAlCarrito(producto)}
                className="text-blue-700 px-4 py-2 rounded-full mt-2 "
              >
                <MdAddShoppingCart className="text-4xl"/>
              </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};