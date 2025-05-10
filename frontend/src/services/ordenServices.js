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
  console.log("ID recibido en obtenerOrdenPorId:", ordenId);
  if (!ordenId) {
    throw new Error("El ID de la orden es inválido o está vacío.");
  }

  const response = await request(`/ordenes/${ordenId}`, "GET", null, true); // Requiere autenticación
  if (!response.success) {
    throw new Error(response.error.message || "Error al obtener la orden.");
  }

  return response.data; // Devuelve la orden completa
};


// ADMINISTRADOR

// Listar todas las órdenes (requiere rol ADMINISTRADOR)
export const listarTodasLasOrdenes = async () => {
  const response = await request("/ordenes/todas", "GET", null, true); // Requiere autenticación
  if (response.success) {
    return response.data; // Devuelve todas las órdenes
  } else {
    throw new Error(response.error.message || "Error al listar todas las órdenes.");
  }
};

// Actualizar el estado de una orden (requiere rol ADMINISTRADOR)
export const actualizarEstadoOrden = async (ordenId, estado) => {
  const response = await request(`/ordenes/${ordenId}/estado`, "PATCH", { estado }, true); // Requiere autenticación
  if (response.success) {
    return response.data; // Devuelve la orden actualizada
  } else {
    throw new Error(response.error.message || "Error al actualizar el estado de la orden.");
  }
};