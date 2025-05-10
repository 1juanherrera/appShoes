import request from "../api/apiClient";
import { setToken } from "../store/session";


export async function login(email, password) {
  const response = await request("/auth/login", "POST", {
    email: email,
    contrasena: password, 
  });

  if (response.success) {
    const data = response.data; 
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
  const response = await request("/auth/register", "POST", formData, false); 
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error.message || "Error al registrar el usuario.");
  }
}

// Actualiza los datos del usuario autenticado
export async function updateUserData(updatedData) {
  const response = await request("/usuarios/me", "PUT", updatedData, true);

  if (response.success) {
    return response.data; 
  } else {
    throw new Error(response.error.message || "Error al actualizar los datos del usuario");
  }
}

