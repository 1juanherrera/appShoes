import { useState, useEffect } from "react";
import request from "../api/apiClient";

export const useCrud = (endpoint) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listar = async () => {
    setLoading(true);
    try {
      const response = await request(endpoint, "GET");
      if (response.success) {
        setItems(response.data);
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const crear = async (data) => {
    try {
      const response = await request(endpoint, "POST", data, true);
      if (response.success) {
        setItems((prev) => [...prev, response.data]);
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const actualizar = async (id, data) => {
    try {
      const response = await request(`${endpoint}/${id}`, "PUT", data, true);
      if (response.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? response.data : item))
        );
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const eliminar = async (id) => {
    try {
      const response = await request(`${endpoint}/${id}`, "DELETE", null, true);
      if (response.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    listar();
  }, [endpoint]);

  return { items, loading, error, crear, actualizar, eliminar, listar };
};