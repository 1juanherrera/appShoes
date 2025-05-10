package com.api.appshoes.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.response.ProductoResponseDTO;
import com.api.appshoes.service.ProductoService;

import org.springframework.lang.Nullable;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<ProductoResponseDTO>> listarProductos(
            @RequestParam @Nullable String nombre, @RequestParam @Nullable Long categoriaId,
            @RequestParam @Nullable Double precioMin, @RequestParam @Nullable Double precioMax
    ) {
        List<ProductoResponseDTO> productos;
        if (nombre != null && !nombre.isBlank()) {
            productos = productoService.buscarPorNombre(nombre);
        } else if (categoriaId != null) {
            productos = productoService.buscarPorCategoria(categoriaId);
            } else if (precioMin != null && precioMax != null) {
            productos = productoService.buscarPorRangoDePrecio(precioMin, precioMax);
        } else {
            productos = productoService.listarTodosLosProductos();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> obtenerProductoPorId(@PathVariable Long id) {
        ProductoResponseDTO producto = productoService.obtenerProductoPorId(id);
        return ResponseEntity.ok(producto);
    }

}
