import { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { ProductoForm } from "./ProductoForm";
import { ProductoDetalle } from "./ProductoDetalle";
import { Message } from "./Message";

export const AdminProductos = () => {
  const { items, crear, actualizar, eliminarFisicamente, toggleActivo, loading } = useCrud("/admin/productos");
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDetalleVisible, setIsDetalleVisible] = useState(false);
  const [message, setMessage] = useState({ visible: false, mensaje: "", tipo: "" });

  const handleSave = async (producto) => {
    try {
      if (producto.id) {
        await actualizar(producto.id, producto);
        setMessage({ visible: true, mensaje: "Producto actualizado con éxito", tipo: "success" });
      } else {
        await crear(producto);
        setMessage({ visible: true, mensaje: "Producto creado con éxito", tipo: "success" });
      }
      setSelectedProducto(null);
      setIsFormVisible(false);
    } catch (err) {
      setMessage({
        visible: true,
        mensaje: err.response?.data?.message || "Error al guardar el producto",
        tipo: "error",
      });
    }
  };

  const handleDeletePhysical = async (id) => {
    try {
      await eliminarFisicamente(id);
      setMessage({ visible: true, mensaje: "Producto eliminado físicamente", tipo: "success" });
    } catch (err) {
      setMessage({
        visible: true,
        mensaje: err.response?.data?.message || "Error al eliminar físicamente el producto",
        tipo: "error",
      });
    }
  };

  const handleViewDetails = (producto) => {
    setSelectedProducto(producto);
    setIsDetalleVisible(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>
      <button
        onClick={() => {
          setSelectedProducto({});
          setIsFormVisible(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
        disabled={loading}
      >
        Crear Producto
      </button>
      {isFormVisible && (
        <ProductoForm
          productoInicial={selectedProducto}
          onSave={handleSave}
          onClose={() => setIsFormVisible(false)}
        />
      )}
      {isDetalleVisible && (
        <ProductoDetalle
          producto={selectedProducto}
          onClose={() => setIsDetalleVisible(false)}
        />
      )}
      <ul>
        {items.map((producto) => (
          <li key={producto.id} className="flex justify-between items-center mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg px-4">
            <div className="p-3 w-5/12 flex justify-between">
              <span>{producto.nombre}</span>
              <div className={`p-0.5 rounded-4xl w-3/12 text-center ${producto.activo ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                <span>{producto.activo ? "Activo" : "Inactivo"}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setSelectedProducto(producto);
                  setIsFormVisible(true);
                  window.scrollTo({ top: 280, behavior: "smooth" });
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
              >
                Editar
              </button>
              {producto.activo ? (
                <button
                  onClick={() => toggleActivo(producto.id, producto.activo)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                >
                  Inactivar
                </button>
              ) : (
                <button
                  onClick={() => toggleActivo(producto.id, producto.activo)}
                  className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-800"
                >
                  Activar
                </button>
              )}
              <button
                onClick={() => handleDeletePhysical(producto.id)}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
              >
                Eliminar
              </button>
              <button
                onClick={() => handleViewDetails(producto)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
              >
                Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Message
        mensaje={message.mensaje}
        tipo={message.tipo}
        visible={message.visible}
        onClose={() => setMessage({ ...message, visible: false })}
      />
    </div>
  );
};