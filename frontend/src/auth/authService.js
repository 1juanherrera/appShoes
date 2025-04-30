import request from "../api/apiClient"; // Asegúrate de que la ruta sea correcta
import { setToken } from "../store/session";

// Inicia sesión y devuelve los datos del usuario
export async function login(email, password) {
  const response = await request("/auth/login", "POST", {
    email: email,
    contrasena: password, // Asegúrate de que coincida con tu DTO
  });

  if (response.success) {
    const data = response.data; // Devuelve los datos del usuario (token, rol, etc.)
    setToken(data.token);
    return data;
  } else {
    throw new Error(response.error.message || "Error al iniciar sesión");
  }
}

// Cierra sesión
export async function logout() {
  const response = await request("/auth/logout", "POST");

  if (!response.success) {
    throw new Error(response.error.message || "Error al cerrar sesión");
  }
}

// Obtiene los datos del usuario autenticado
export async function getUserData() {
  const response = await request("/usuarios/me", "GET", null, true);

  if (response.success) {
    return response.data; // Devuelve los datos del usuario
  } else {
    throw new Error(response.error.message || "No autenticado");
  }
}

export const registrarUsuario = async (formData) => {
  const response = await request("/auth/register", "POST", formData, false); // Cambia la URL si es necesario
  if (response.success) {
    return response.data; // Devuelve el token y los datos del usuario
  } else {
    throw new Error(response.error.message || "Error al registrar el usuario.");
  }
};