package com.api.appshoes.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.response.CategoriaResponseDTO;
import com.api.appshoes.model.dto.response.ProductoResponseDTO;
import com.api.appshoes.service.CategoriaService;
import com.api.appshoes.service.ProductoService;

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
