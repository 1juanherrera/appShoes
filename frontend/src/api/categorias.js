import request from "./apiClient";

// Obtener todas las categorías
export async function listarCategorias() {
  return await request("/categorias", "GET", null, false);
}

// Obtener una categoría por ID
export async function obtenerCategoriaPorId(id) {
  return await request(`/categorias/${id}`, "GET", null, false);
}

// Obtener productos de una categoría específica
export async function obtenerProductosPorCategoria(id) {
  return await request(`/categorias/${id}/productos`, "GET", null, false);
}