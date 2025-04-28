package com.api.webapp.controller;

import com.api.webapp.model.dto.request.CategoriaRequestDTO;
import com.api.webapp.model.dto.response.CategoriaResponseDTO;
import com.api.webapp.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin/categorias")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMINISTRADOR')")
public class AdminCategoriaController {
    private final CategoriaService categoriaService;
    
    @PostMapping
    public ResponseEntity<CategoriaResponseDTO> crearCategoria(@Valid @RequestBody CategoriaRequestDTO categoriaRequest) {
        CategoriaResponseDTO categoriaCreada = categoriaService.crearCategoria(categoriaRequest);
        return new ResponseEntity<>(categoriaCreada, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaResponseDTO> actualizarCategoria(
            @PathVariable Long id,
            @Valid @RequestBody CategoriaRequestDTO categoriaRequest) {
        CategoriaResponseDTO categoriaActualizada = categoriaService.actualizarCategoria(id, categoriaRequest);
        return ResponseEntity.ok(categoriaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
