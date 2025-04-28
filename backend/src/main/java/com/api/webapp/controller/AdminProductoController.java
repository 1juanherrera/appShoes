package com.api.webapp.controller;

import com.api.webapp.model.dto.request.ProductoRequestDTO;
import com.api.webapp.model.dto.response.ProductoResponseDTO;
import com.api.webapp.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/productos")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMINISTRADOR')")
public class AdminProductoController {
    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crearProducto(@Valid @RequestBody ProductoRequestDTO productoRequest) {
        ProductoResponseDTO productoCreado = productoService.crearProducto(productoRequest);
        return new ResponseEntity<>(productoCreado, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> actualizarProducto(
            @PathVariable Long id,
            @Valid @RequestBody ProductoRequestDTO productoRequest) {
        ProductoResponseDTO productoActualizado = productoService.actualizarProducto(id, productoRequest);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLogicamenteProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/reactivar") // PATCH para la accion especifica de reactivar
    public ResponseEntity<ProductoResponseDTO> reactivarProducto(@PathVariable Long id) {
        ProductoResponseDTO productoReactivado = productoService.reactivarProducto(id);
        return ResponseEntity.ok(productoReactivado);
    }


    @GetMapping // Se mapeará a la ruta base: GET /api/admin/productos
    public ResponseEntity<List<ProductoResponseDTO>> listarTodosLosProductosParaAdmin() {
        // Llama al NUEVO método del servicio que no filtra
        List<ProductoResponseDTO> todosLosProductos = productoService.listarTodosLosProductosParaAdmin();
        // Devuelve la lista completa en la respuesta
        return ResponseEntity.ok(todosLosProductos);
    }
    @GetMapping("/{id}") // <<<---- ¡ESTE FALTABA! Maneja GET /api/admin/productos/{id}
    public ResponseEntity<ProductoResponseDTO> obtenerProductoPorIdParaAdmin(@PathVariable Long id) {
        // Llama al método del servicio que busca por ID sin filtrar estado
        ProductoResponseDTO producto = productoService.obtenerProductoPorIdAdmin(id);
        return ResponseEntity.ok(producto); // Devuelve el producto encontrado
    }
}
