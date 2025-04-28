package com.api.webapp.service;

import com.api.webapp.model.dto.request.CategoriaRequestDTO;
import com.api.webapp.model.dto.response.CategoriaResponseDTO;

import java.util.List;

public interface CategoriaService {

    CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaRequest); // Admin

    CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO categoriaRequest); // Admin

    void eliminarCategoria(Long id); // Admin

    CategoriaResponseDTO obtenerCategoriaPorId(Long id);

    List<CategoriaResponseDTO> listarCategorias();
}
