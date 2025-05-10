package com.api.appshoes.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.request.OrdenStatusUpdateRequestDTO;
import com.api.appshoes.model.dto.response.OrdenResponseDTO;
import com.api.appshoes.model.entity.Usuario;
import com.api.appshoes.service.OrdenService;

import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@RequiredArgsConstructor
public class OrdenController {
    private final OrdenService ordenService;

    // crear una nueva orden a partir del carrito del usuario autenticado
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrdenResponseDTO> crearOrden(@AuthenticationPrincipal Usuario usuario) {
        OrdenResponseDTO ordenCreada = ordenService.crearOrdenDesdeCarrito(usuario.getId());
        return new ResponseEntity<>(ordenCreada, HttpStatus.CREATED);
    }

    // obtener las ordenes del usuario autenticado
    @GetMapping("/mis-ordenes")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OrdenResponseDTO>> listarMisOrdenes(@AuthenticationPrincipal Usuario usuario) {
        List<OrdenResponseDTO> ordenes = ordenService.listarOrdenesPorUsuario(usuario.getId());
        return ResponseEntity.ok(ordenes);
    }

    // obtener una orden especifica por ID (Admin)
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrdenResponseDTO> obtenerOrdenPorId(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {
        OrdenResponseDTO orden = ordenService.obtenerOrdenPorId(id);
    
        // Verifica si el usuario autenticado tiene permiso para ver la orden
        if (!orden.getUsuario().getId().equals(usuario.getId()) && 
            !usuario.getRol().name().equals("ADMINISTRADOR")) {
            throw new org.springframework.security.access.AccessDeniedException("No tiene permiso para ver esta orden.");
        }
    
        return ResponseEntity.ok(orden);
    }

    // ADMINISTRADOR

    @GetMapping("/todas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<OrdenResponseDTO>> listarTodasLasOrdenes() {
        List<OrdenResponseDTO> ordenes = ordenService.listarTodasLasOrdenes();
        return ResponseEntity.ok(ordenes);
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<OrdenResponseDTO> actualizarEstadoOrden(
            @PathVariable Long id,
            @Valid @RequestBody OrdenStatusUpdateRequestDTO statusUpdateRequest) {
        OrdenResponseDTO ordenActualizada = ordenService.actualizarEstadoOrden(id, statusUpdateRequest);
        return ResponseEntity.ok(ordenActualizada);
    }
}
