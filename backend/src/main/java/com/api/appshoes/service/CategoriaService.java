package com.api.appshoes.service;

import java.util.List;

import com.api.appshoes.model.dto.request.CategoriaRequestDTO;
import com.api.appshoes.model.dto.response.CategoriaResponseDTO;

public interface CategoriaService {

    CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaRequest); // Admin

    CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO categoriaRequest); // Admin

    void eliminarCategoria(Long id); // Admin

    CategoriaResponseDTO obtenerCategoriaPorId(Long id);

    List<CategoriaResponseDTO> listarCategorias();
}
