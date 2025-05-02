import { useState, useCallback } from "react";
import { listarTodasLasOrdenes, obtenerOrdenPorId, actualizarEstadoOrden } from "../services/ordenServices";

export const useOrdenesAdmin = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [orden, setOrden] = useState(null);
  const [ordenId, setOrdenId] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const fetchTodasLasOrdenes = useCallback(async () => {
    try {
      const data = await listarTodasLasOrdenes();
      setOrdenes(data);
      setError("");
    } catch (err) {
      console.error("Error al listar todas las órdenes:", err);
      setError(err.message);
    }
  }, []); // Dependencias vacías para que la referencia no cambie

  const fetchOrdenPorId = async () => {
    try {
      const data = await obtenerOrdenPorId(ordenId);
      setOrden(data);
      setError("");
    } catch (err) {
      console.error("Error al obtener la orden:", err);
      setError(err.message);
    }
  };

  const updateEstadoOrden = async (id) => {
    try {
      const data = await actualizarEstadoOrden(id, estado);
      setMensaje("Estado actualizado con éxito.");
      setError("");
      fetchTodasLasOrdenes(); // Refresca la lista de órdenes
    } catch (err) {
      console.error("Error al actualizar el estado de la orden:", err);
      setError(err.message);
    }
  };

  return {
    ordenes,
    orden,
    ordenId,
    estado,
    mensaje,
    error,
    setOrdenId,
    setEstado,
    fetchTodasLasOrdenes,
    fetchOrdenPorId,
    updateEstadoOrden,
  };
};