import request from "../api/apiClient";

export const crearOrden = async () => {
  const response = await request("/ordenes", "POST", null, true); // Requiere autenticación
  if (response.success) {
    return response.data; // Devuelve la orden creada
  } else {
    throw new Error(response.error.message || "Error al crear la orden.");
  }
}

export const listarMisOrdenes = async () => {
  const response = await request("/ordenes/mis-ordenes", "GET", null, true); // Requiere autenticación
  if (response.success) {
    return response.data; // Devuelve las órdenes del usuario
  } else {
    throw new Error(response.error.message || "Error al listar las órdenes.");
  }
};

export const obtenerOrdenPorId = async (ordenId) => {
  const response = await request(`/ordenes/${ordenId}`, "GET", null, true); // Requiere autenticación
  return response.data; // Devuelve la orden completa
};