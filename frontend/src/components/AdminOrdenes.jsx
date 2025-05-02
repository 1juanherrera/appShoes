import { useEffect, useState } from "react";
import { useOrdenesAdmin } from "../hooks/useOrdenesAdmin";
import { obtenerOrdenPorId } from "../services/ordenServices";
import { Message } from "../components/Message";

export const AdminOrdenes = () => {
  const {
    error,
    success,
    ordenes,
    setEstado,
    updateEstadoOrden,
    fetchTodasLasOrdenes,
  } = useOrdenesAdmin();

  const [busquedaId, setBusquedaId] = useState(""); // Estado para el ID de búsqueda
  const [ordenEncontrada, setOrdenEncontrada] = useState(null); // Estado para la orden encontrada
  const [message, setMessage] = useState({ visible: false, tipo: "", mensaje: "" }); // Estado para manejar mensajes

  // Cargar todas las órdenes al montar el componente
  useEffect(() => {
    fetchTodasLasOrdenes();
  }, [fetchTodasLasOrdenes]);

  // Función para buscar una orden por ID
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
      const orden = await obtenerOrdenPorId(busquedaId); // Pasa el ID como argumento
      setOrdenEncontrada(orden); // Almacena la orden encontrada
      setMessage({
        visible: true,
        tipo: "success",
        mensaje: "Orden encontrada con éxito.",
      });
    } catch (err) {
      setOrdenEncontrada(null); // Limpia la orden encontrada
      setMessage({
        visible: true,
        tipo: "error",
        mensaje: "No se encontró la orden con el ID proporcionado.",
      });
    }
  };

  // Función para limpiar la búsqueda
  const limpiarBusqueda = () => {
    setBusquedaId(""); // Limpia el campo de búsqueda
    setOrdenEncontrada(null); // Limpia la orden encontrada
    setMessage({ visible: false, tipo: "", mensaje: "" }); // Oculta el mensaje
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administrar Órdenes</h1>

      {/* Campo de búsqueda por ID */}
      <div className="flex items-center separador">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)} // Actualiza el estado del input
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

      {/* Mostrar mensajes de error o éxito */}
      <Message
        mensaje={message.mensaje}
        tipo={message.tipo}
        visible={message.visible}
        onClose={() => setMessage({ ...message, visible: false })}
      />

      {/* Mostrar la orden encontrada */}
      {ordenEncontrada && (
        <div className="separador">
          <h4 className="text-xl font-semibold mb-2">Orden Encontrada</h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Usuario</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Acciones</th>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
              {error && <p className="text-sm text-red-500 pt-2">{error}</p>}
              {success && <p className="text-sm text-green-500 pt-2">{success}</p>}
      <hr />

      {/* Listar todas las órdenes */}
      <div className="separador">
        <h4 className="text-xl font-semibold mb-2">Todas las Órdenes</h4>
        {Array.isArray(ordenes) && ordenes.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Usuario</th>
                <th className="border px-4 py-2">Estado</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Acciones</th>
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
                  <td className="border px-4 py-2">
                    <select
                      value={orden.estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="border px-2 py-1 rounded-lg"
                    >
                      <option value="PENDIENTE">PENDIENTE</option>
                      <option value="ENVIADO">ENVIADO</option>
                      <option value="ENTREGADO">ENTREGADO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">${orden.total.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => updateEstadoOrden(orden.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Actualizar
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
    </div>
  );
};