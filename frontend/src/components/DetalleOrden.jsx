import React, { useState, useEffect } from "react";
import { obtenerOrdenPorId } from "../services/ordenServices";
import { IoCloseSharp } from "react-icons/io5";

export const DetalleOrden = ({ ordenId, onClose }) => {
  const [orden, setOrden] = useState(null); // Almacena la orden completa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const data = await obtenerOrdenPorId(ordenId);
        setOrden(data); // Almacena la orden completa
      } catch (err) {
        setError(err.message || "Error al cargar los detalles de la orden.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrden();
  }, [ordenId]);

  if (loading) return <p className="text-center text-gray-500">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!orden || !orden.detalles || orden.detalles.length === 0) {
    return <p className="text-center text-gray-500 p-4">No hay detalles para esta orden.</p>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full md:w-3/4 md:h-3/4 rounded-lg overflow-y-auto shadow-lg relative p-5    ">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
        >
          <IoCloseSharp size={35}/>
        </button>

        {/* Encabezado */}
        <div className=" border-b">
          <h2 className="text-2xl font-bold">Detalles de la Orden #{ordenId}</h2>
          <div className="text-gray-600 flex items-center mt-2 pb-2">
            <span className="pr-3">Estado:</span>
            <div className="bg-yellow-500 p-1 w-40 cursor-pointer text-center rounded-xl font-semibold text-white">
                  {orden.estado}
          </div>
          </div>
          <p className="text-gray-600">Fecha: {new Date(orden.fecha).toLocaleDateString()}</p>
        </div>

        {/* Tabla de detalles */}
        <div className="">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Imagen</th>
                <th className="border px-4 py-2">Producto</th>
                <th className="border px-4 py-2">Cantidad</th>
                <th className="border px-4 py-2">Precio Unitario</th>
                <th className="border px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.detalles.map((detalle) => {
                const { cantidad, precio, producto } = detalle;
                const { nombre, imagen } = producto || {};
                return (
                  <tr key={detalle.id}>
                    <td className="border px-4 py-2">
                      <img
                        src={imagen || "https://via.placeholder.com/100"}
                        alt={nombre || "Producto"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{nombre || "Producto no disponible"}</td>
                    <td className="border px-4 py-2 text-center">{cantidad}</td>
                    <td className="border px-4 py-2 text-center">${precio.toFixed(2)}</td>
                    <td className="border px-4 py-2 text-center">${(cantidad * precio).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="pt-2">
          <p className="text-right text-xl font-semibold">
            Total: ${orden.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};