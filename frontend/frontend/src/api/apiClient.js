import { getToken } from "../utils/session"; // Asegúrate de tener una función para obtener el token

const BASE_URL = "http://localhost:5000/api"; // Cambia esto si tu backend está en otra URL

async function request(endpoint, method = "GET", data = null, needsAuth = false) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
  };

  // Si la solicitud requiere autenticación, agrega el token al encabezado
  if (needsAuth) {
    const token = getToken(); // Obtén el token desde tu sistema de autenticación
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn(`Llamada a ${endpoint} requiere autenticación pero no hay token.`);
      return {
        success: false,
        error: { status: 401, message: "No autenticado o sesión expirada. Inicia sesión de nuevo." },
        data: null,
      };
    }
  }

  const config = {
    method: method,
    headers: headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    // Manejo de respuestas sin contenido
    if (response.status === 204) {
      return { success: true, error: null, data: null, status: response.status };
    }

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          status: response.status,
          message: responseData.message || `Error ${response.status}`,
        },
        data: null,
      };
    }

    return { success: true, error: null, data: responseData, status: response.status };
  } catch (error) {
    console.error("[ApiClient] Error en fetch o parseo:", error);
    return { success: false, error: { message: error.message || "Error de conexión." }, data: null };
  }
}

export default request;