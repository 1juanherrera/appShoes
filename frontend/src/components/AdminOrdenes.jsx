import { useEffect, useState } from "react";
import { useOrdenesAdmin } from "../hooks/useOrdenesAdmin";
import { obtenerOrdenPorId } from "../services/ordenServices";
import { Message } from "../components/Message";
import { DetalleOrden } from "./DetalleOrden";
import { getEstadoColor } from "../utils/getColor";

export const AdminOrdenes = () => {
  const {
    error,
    success,
    ordenes,
    updateEstadoOrden,
    fetchTodasLasOrdenes,
  } = useOrdenesAdmin();

  const [busquedaId, setBusquedaId] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [message, setMessage] = useState({ visible: false, tipo: "", mensaje: "" });
  const [estadoTemporal, setEstadoTemporal] = useState({});
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  useEffect(() => {
    fetchTodasLasOrdenes();
  }, [fetchTodasLasOrdenes])

  const buscarPorId = async () => {
    if (!busquedaId || isNaN(busquedaId)) {
      setMessage({
        visible: true,
        tipo: "error",
        mensaje: "Por favor, ingresa un ID válido.",
      });
      return;
    }

    try {
      const orden = await obtenerOrdenPorId(busquedaId);
      setOrdenEncontrada(orden);
      setMessage({
        visible: true,
        tipo: "success",
        mensaje: "Orden encontrada con éxito.",
      });
    } catch (err) {
      setOrdenEncontrada(null);
      setMessage({
        visible: true,
        tipo: "error",
        mensaje: "No se encontró la orden con el ID proporcionado.",
      });
    }
  }

  const limpiarBusqueda = () => {
    setBusquedaId("");
    setOrdenEncontrada(null);
    setMessage({ visible: false, tipo: "", mensaje: "" });
  }

  const actualizarEstado = async (ordenId) => {
    try {
      const nuevoEstado = estadoTemporal[ordenId];
      if (!nuevoEstado) return;

      await updateEstadoOrden(ordenId, nuevoEstado);
      setMessage({
        visible: true,
        tipo: "success",
        mensaje: "Estado actualizado con éxito.",
      });
      fetchTodasLasOrdenes();
    } catch (err) {
      setMessage({
        visible: true,
        tipo: "error",
        mensaje: "Error al actualizar el estado.",
      });
    }
  }

  const verDetallesOrden = (orden) => {
    setOrdenSeleccionada(orden);
    setMostrarDetalles(true);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administrar Órdenes</h1>

      <div className="flex items-center separador">
        <input
          type="text"
          placeholder="Buscar por número de orden"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)}
          className="border px-4 py-2 rounded-lg mr-2"
        />
        <button
          onClick={buscarPorId}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
        >
          Buscar
        </button>
        <button
          onClick={limpiarBusqueda}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Limpiar búsqueda
        </button>
      </div>
      <hr />

      <Message
        mensaje={message.mensaje}
        tipo={message.tipo}
        visible={message.visible}
        onClose={() => setMessage({ ...message, visible: false })}
      />

      {ordenEncontrada && (
        <div className="separador">
          <h4 className="text-xl font-semibold mb-2">Orden Encontrada</h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Orden</th>
                <th className="border px-4 py-2">Usuario</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Acciones</th>
                <th className="border px-4 py-2">Detalles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{ordenEncontrada.id}</td>
                <td className="border px-4 py-2">
                  {ordenEncontrada.usuario
                    ? `${ordenEncontrada.usuario.nombres} ${ordenEncontrada.usuario.apellidos}`
                    : "Desconocido"}
                </td>
                <td className="border px-4 py-2">{ordenEncontrada.estado}</td>
                <td className="border px-4 py-2">${ordenEncontrada.total.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => actualizarEstado(ordenEncontrada.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Actualizar
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => verDetallesOrden(ordenEncontrada)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="separador">
        <h4 className="text-xl font-semibold mb-2">Todas las Órdenes</h4>
        {Array.isArray(ordenes) && ordenes.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Orden</th>
                <th className="border px-4 py-2">Usuario</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Acciones</th>
                <th className="border px-4 py-2">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td className="border px-4 py-2">{orden.id}</td>
                  <td className="border px-4 py-2">
                    {orden.usuario
                      ? `${orden.usuario.nombres} ${orden.usuario.apellidos}`
                      : "Desconocido"}
                  </td>
                  <td className="border px-4 py-2 flex justify-between items-center">
                    <select
                      value={estadoTemporal[orden.id] || orden.estado}
                      onChange={(e) =>
                        setEstadoTemporal({
                          ...estadoTemporal,
                          [orden.id]: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg"
                    >
                      <option value="PENDIENTE">PENDIENTE</option>
                      <option value="ENVIADO">ENVIADO</option>
                      <option value="ENTREGADO">ENTREGADO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                    <div className={`${getEstadoColor(orden.estado)} h-5 w-5 rounded-full`}></div>
                  </td>
                  <td className="border px-4 py-2">${orden.total.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => actualizarEstado(orden.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Actualizar
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => verDetallesOrden(orden)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay órdenes disponibles.</p>
        )}
      </div>

      {mostrarDetalles && (
        <DetalleOrden
          ordenId={ordenSeleccionada.id}
          onClose={() => setMostrarDetalles(false)}
        />
      )}
    </div>
  );
};