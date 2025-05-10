package com.api.appshoes.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.appshoes.exception.BadRequestException;
import com.api.appshoes.exception.ResourceNotFoundException;
import com.api.appshoes.model.dto.request.CategoriaRequestDTO;
import com.api.appshoes.model.dto.response.CategoriaResponseDTO;
import com.api.appshoes.model.entity.Categoria;
import com.api.appshoes.repository.CategoriaRepository;
import com.api.appshoes.service.CategoriaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Override
    @Transactional
    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaRequest) {
        if (categoriaRepository.existsByNombreIgnoreCase(categoriaRequest.getNombre())) {
            throw new BadRequestException("Ya existe una categoría con el nombre: " + categoriaRequest.getNombre());
        }
        Categoria nuevaCategoria = Categoria.builder()
                .nombre(categoriaRequest.getNombre())
                .build();
        Categoria categoriaGuardada = categoriaRepository.save(nuevaCategoria);
        return mapCategoriaToCategoriaResponseDTO(categoriaGuardada);
    }

    @Override
    @Transactional
    public CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO categoriaRequest) {
        Categoria categoriaExistente = findCategoriaByIdOrElseThrow(id);

        categoriaRepository.findByNombreIgnoreCase(categoriaRequest.getNombre())
                .ifPresent(catConMismoNombre -> {
                    if (!catConMismoNombre.getId().equals(id)) {
                        throw new BadRequestException("Ya existe otra categoría con el nombre: " + categoriaRequest.getNombre());
                    }
                });

        categoriaExistente.setNombre(categoriaRequest.getNombre());
        Categoria categoriaActualizada = categoriaRepository.save(categoriaExistente);
        return mapCategoriaToCategoriaResponseDTO(categoriaActualizada);
    }

    @Override
    public void eliminarCategoria(Long id) {
        Categoria categoria = findCategoriaByIdOrElseThrow(id);
        categoriaRepository.delete(categoria);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponseDTO obtenerCategoriaPorId(Long id) {
        return mapCategoriaToCategoriaResponseDTO(findCategoriaByIdOrElseThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> listarCategorias() {
        return categoriaRepository.findAll()
                .stream()
                .map(this::mapCategoriaToCategoriaResponseDTO)
                .collect(Collectors.toList());
    }


    // Metodos privado
    private Categoria findCategoriaByIdOrElseThrow(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
    }

    CategoriaResponseDTO mapCategoriaToCategoriaResponseDTO(Categoria categoria) { // Visibilidad de paquete
        if (categoria == null) return null;
        return CategoriaResponseDTO.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .build();
    }
}
