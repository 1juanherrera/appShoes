import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../api/apiClient";
import { Message } from "../components/Message";

export const DetalleProducto = () => {
  const { id } = useParams(); // ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const [mensaje, setMensaje] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);

      const response = await request(`/productos/${id}`, "GET", null, false); // Llamada a la API
      if (response.success) {
        setProducto(response.data);
      } else {
        setError(response.error?.message || "Error al cargar el producto.");
      }
      setLoading(false);
    };

    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = async () => {
    try {
      const response = await request(
        "/carrito/items",
        "POST",
        { productoId: producto.id, cantidad },
        true // Requiere autenticación
      );

      if (response.success) {
        setMensaje("Producto agregado al carrito");
        setTipoMensaje("success");
      } else {
        setMensaje(response.error?.message || "Error al agregar el producto al carrito");
        setTipoMensaje("error");
      }
    } catch (err) {
      console.error("Error al agregar el producto al carrito:", err);
      setMensaje("Error al agregar el producto al carrito");
      setTipoMensaje("error");
    } finally {
      setMensajeVisible(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-blue-500 animate-pulse">
          Cargando producto...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-red-600">
          Producto no encontrado
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8 lg:px-16">
      <Message
        mensaje={mensaje}
        tipo={tipoMensaje}
        visible={mensajeVisible}
        onClose={() => setMensajeVisible(false)}
      />
      <div className="grid md:grid-cols-2 gap-10 items-start bg-white shadow-xl rounded-xl p-5">
        <div className="w-full">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-6 pt-4">
          <h1 className="text-4xl font-bold text-gray-800">{producto.nombre}</h1>

          <p className="text-gray-600 text-lg">{producto.descripcion}</p>

          <div className="text-3xl font-bold text-green-600 pb-4">${producto.precio}</div>

          <div className="text-md font-semibold pb-4">
            Stock:{" "}
            <span
              className={`${
                producto.stock > 0 ? "text-green-700" : "text-red-700"
              } font-bold`}
            >
              {producto.stock > 0
                ? `${producto.stock} disponibles`
                : "No disponible"}
            </span>
          </div>

          <div className="flex items-center space-x-4 pb-4">
            <button
              onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-4"
              disabled={cantidad <= 1}
            >
              -
            </button>
            <span className="text-lg font-medium">{cantidad}</span>
            <button
              onClick={() =>
                setCantidad((prev) =>
                  prev < producto.stock ? prev + 1 : prev
                )
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ml-4"
              disabled={cantidad >= producto.stock}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAgregarAlCarrito}
            disabled={producto.stock <= 0}
            className={`w-full py-3 text-lg font-semibold rounded-lg shadow transition duration-200 mt-4 ${
              producto.stock > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};