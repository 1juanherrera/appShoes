import { getToken } from "../store/session"; // Asegúrate de tener una función para obtener el token

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

    // Manejo de respuestas sin contenido (204 No Content)
    if (response.status === 204) {
      return { success: true, error: null, data: null, status: response.status };
    }

    // Intenta parsear la respuesta como JSON
    let responseData = null;
    try {
      responseData = await response.json();
    } catch (error) {
      // Si no se puede parsear, verifica si la respuesta es válida
      if (!response.ok) {
        return {
          success: false,
          error: {
            status: response.status,
            message: response.statusText || `Error ${response.status}`,
          },
          data: null,
        };
      }
    }

    // Manejo de errores HTTP
    if (!response.ok) {
      return {
        success: false,
        error: {
          status: response.status,
          message: responseData?.message || response.statusText || `Error ${response.status}`,
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