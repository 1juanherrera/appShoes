import { useState, useEffect } from "react";
import request from "../api/apiClient";

export const useCrud = (endpoint, customActions = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listar = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = customActions.listar
        ? await customActions.listar()
        : await request(endpoint, "GET", null, true);

      if (response.success) {
        const data = Array.isArray(response.data) ? response.data : [];
        setItems(data);
      } else {
        throw new Error(response.error?.message || "Error al listar los datos.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const crear = async (data) => {
    try {
      const response = customActions.crear
        ? await customActions.crear(data)
        : await request(endpoint, "POST", data, true);

      if (response.success) {
        setItems((prev) => [...prev, response.data]);
      } else {
        throw new Error(response.error?.message || "Error al crear.");
      }

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const actualizar = async (id, data) => {
    try {
      const response = customActions.actualizar
        ? await customActions.actualizar(id, data)
        : await request(`${endpoint}/${id}`, "PUT", data, true);

      if (response.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? response.data : item))
        );
      } else {
        throw new Error(response.error?.message || "Error al actualizar.");
      }

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const eliminar = async (id) => {
    try {
      const response = customActions.eliminar
        ? await customActions.eliminar(id)
        : await request(`${endpoint}/${id}`, "DELETE", null, true);

      if (response.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error(response.error?.message || "Error al eliminar.");
      }

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    listar();
  }, [endpoint]);

  const eliminarFisicamente = async (id) => {
    try {
      const response = await request(`${endpoint}/${id}/force`, "DELETE", null, true);

      if (response.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error(response.error?.message || "Error al eliminar físicamente.");
      }

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    listar();
  }, [endpoint]);

  const toggleActivo = async (id, activo) => {
    try {
      // Determina la acción a realizar (activar o inactivar)
      const endpointAction = activo ? `${endpoint}/${id}` : `${endpoint}/${id}/reactivar`;
      const method = activo ? "DELETE" : "PATCH";
  
      const response = await request(endpointAction, method, null, true);
  
      if (response.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, activo: !activo } : item))
        );
      } else {
        throw new Error(response.error?.message || "Error al cambiar el estado del producto.");
      }
  
      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return { items, loading, error, crear, actualizar, eliminar, listar, eliminarFisicamente, toggleActivo };
};
