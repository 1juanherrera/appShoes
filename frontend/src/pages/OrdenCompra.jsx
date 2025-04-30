import React, { useState, useEffect } from "react";
import { listarMisOrdenes } from "../services/ordenServices";
import { DetalleOrden } from "../components/DetalleOrden";

export const OrdenCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null); // Para manejar la orden seleccionada
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await listarMisOrdenes();
        setOrdenes(data);
      } catch (err) {
        console.error("Error al listar las órdenes:", err);
        setError(err.message || "Ocurrió un error inesperado.");
      }
    }

    fetchOrdenes();
  }, [])

  const handleVerDetalles = (ordenId) => {
    setOrdenSeleccionada(ordenId); // Establece la orden seleccionada
  };

  const handleCerrarDetalles = () => {
    setOrdenSeleccionada(null); // Cierra el componente de detalles
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
      {error && <p className="text-red-500">{error}</p>}
      {ordenes.length === 0 ? (
        <p className="text-gray-600">No tienes órdenes registradas.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td className="border px-4 py-2">{orden.id}</td>
                <td className="border px-4 py-2"> {new Date(orden.fecha).toLocaleDateString()} {new Date(orden.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="border px-4 py-2 ">
                  <div className="bg-yellow-500 p-1 cursor-pointer text-center rounded-xl font-semibold text-white">
                  {orden.estado}
                  </div>
                </td>
                <td className="border px-4 py-2">${orden.total.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleVerDetalles(orden.id)} // Abre los detalles de la orden
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Renderiza el componente DetalleOrden si hay una orden seleccionada */}
      {ordenSeleccionada && (
        <DetalleOrden ordenId={ordenSeleccionada} onClose={handleCerrarDetalles} />
      )}
    </div>
  );
};