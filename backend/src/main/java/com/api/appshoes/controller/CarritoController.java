package com.api.appshoes.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.request.CarritoAddItemRequestDTO;
import com.api.appshoes.model.dto.request.CarritoUpdateItemRequestDTO;
import com.api.appshoes.model.dto.response.CarritoResponseDTO;
import com.api.appshoes.model.entity.Usuario;
import com.api.appshoes.service.CarritoService;

@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()") // Tod0 requieren autenticacion
public class CarritoController {
    private final CarritoService carritoService;

    // obtener el carrito del usuario actual
    @GetMapping
    public ResponseEntity<CarritoResponseDTO> obtenerMiCarrito(@AuthenticationPrincipal Usuario usuario) {
        CarritoResponseDTO carrito = carritoService.obtenerCarritoDelUsuario(usuario.getId());
        return ResponseEntity.ok(carrito);
    }

    // añadir un item al carrito
    @PostMapping("/items")
    public ResponseEntity<CarritoResponseDTO> agregarItem(
            @AuthenticationPrincipal Usuario usuario,
            @Valid @RequestBody CarritoAddItemRequestDTO itemRequest) {
        CarritoResponseDTO carritoActualizado = carritoService.agregarItemAlCarrito(usuario.getId(), itemRequest);
        return ResponseEntity.ok(carritoActualizado);
    }

    // actualizar la cantidad de un item en el carrito
    @PutMapping("/items/{productoId}")
    public ResponseEntity<CarritoResponseDTO> actualizarItem(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable Long productoId,
            @Valid @RequestBody CarritoUpdateItemRequestDTO updateRequest) {
        CarritoResponseDTO carritoActualizado = carritoService.actualizarCantidadItem(usuario.getId(), productoId, updateRequest);
        return ResponseEntity.ok(carritoActualizado);
    }

    @DeleteMapping("/items/{productoId}")
    public ResponseEntity<CarritoResponseDTO> eliminarItem(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable Long productoId) {
        CarritoResponseDTO carritoActualizado = carritoService.eliminarItemDelCarrito(usuario.getId(), productoId);
        return ResponseEntity.ok(carritoActualizado);
    }

    // vaciar tod0 el carrito
    @DeleteMapping
    public ResponseEntity<Void> limpiarCarrito(@AuthenticationPrincipal Usuario usuario) {
        carritoService.limpiarCarrito(usuario.getId());
        return ResponseEntity.noContent().build();
    }
}
