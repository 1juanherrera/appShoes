package com.api.webapp.service;

import com.api.webapp.model.dto.request.ProductoRequestDTO;
import com.api.webapp.model.dto.response.ProductoResponseDTO;

import java.util.List;

public interface ProductoService {
    ProductoResponseDTO crearProducto(ProductoRequestDTO productoRequest); // Admin

    ProductoResponseDTO actualizarProducto(Long id, ProductoRequestDTO productoRequest); // Admin

    void eliminarProducto(Long id); // Admin

    ProductoResponseDTO reactivarProducto(Long id); //admin

    ProductoResponseDTO obtenerProductoPorId(Long id);

    List<ProductoResponseDTO> listarTodosLosProductos();

    // Métodos de búsqueda
    List<ProductoResponseDTO> buscarPorNombre(String nombre);

    List<ProductoResponseDTO> buscarPorCategoria(Long categoriaId);

    List<ProductoResponseDTO> listarTodosLosProductosParaAdmin();

    ProductoResponseDTO obtenerProductoPorIdAdmin(Long id);

    List<ProductoResponseDTO> buscarPorRangoDePrecio(Double min, Double max);
}
