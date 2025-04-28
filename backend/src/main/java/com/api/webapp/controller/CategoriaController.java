package com.api.webapp.controller;

import com.api.webapp.model.dto.response.CategoriaResponseDTO;
import com.api.webapp.model.dto.response.ProductoResponseDTO;
import com.api.webapp.service.CategoriaService;
import com.api.webapp.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;
    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategorias() {
        List<CategoriaResponseDTO> categorias = categoriaService.listarCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaResponseDTO> obtenerCategoriaPorId(@PathVariable Long id) {
        CategoriaResponseDTO categoria = categoriaService.obtenerCategoriaPorId(id);
        return ResponseEntity.ok(categoria);
    }

    // productos de una categoria especifica
    @GetMapping("/{id}/productos")
    public ResponseEntity<List<ProductoResponseDTO>> obtenerProductosPorCategoria(@PathVariable Long id) {
        List<ProductoResponseDTO> productos = productoService.buscarPorCategoria(id);
        return ResponseEntity.ok(productos);
    }
}
