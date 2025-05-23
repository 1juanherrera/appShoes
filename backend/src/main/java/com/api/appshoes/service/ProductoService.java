package com.api.appshoes.service;

import java.util.List;

import com.api.appshoes.model.dto.request.ProductoRequestDTO;
import com.api.appshoes.model.dto.response.ProductoResponseDTO;

public interface ProductoService {
    ProductoResponseDTO crearProducto(ProductoRequestDTO productoRequest); // Admin

    ProductoResponseDTO actualizarProducto(Long id, ProductoRequestDTO productoRequest); // Admin

    void eliminarProducto(Long id); // Admin

    void eliminarFisicamenteProducto(Long id);

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
