package com.api.appshoes.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.request.UsuarioUpdateRequestDTO;
import com.api.appshoes.model.dto.response.UsuarioResponseDTO;
import com.api.appshoes.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/usuarios")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMINISTRADOR')")
public class AdminUsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodosLosUsuarios() {
        List<UsuarioResponseDTO> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        UsuarioResponseDTO usuario = usuarioService.obtenerUsuarioResponsePorId(id);
        return ResponseEntity.ok(usuario);
    }

    // actualizacion por ID (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuarioPorAdmin(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioUpdateRequestDTO updateRequest) {
        UsuarioResponseDTO usuarioActualizado = usuarioService.actualizarUsuario(id, updateRequest);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
