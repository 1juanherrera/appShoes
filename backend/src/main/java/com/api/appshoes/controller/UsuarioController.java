package com.api.appshoes.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.api.appshoes.model.dto.request.UsuarioUpdateRequestDTO;
import com.api.appshoes.model.dto.response.UsuarioResponseDTO;
import com.api.appshoes.model.entity.Usuario;
import com.api.appshoes.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // obtener el perfil del usuario autenticado
    @GetMapping("/me") // /me es una convencion que significa "el usuario actualmente autenticado"
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UsuarioResponseDTO> obtenerMiPerfil(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(usuarioService.obtenerUsuarioResponsePorId(usuario.getId()));
    }

    // actualizar el perfil del usuario autenticado
    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UsuarioResponseDTO> actualizarMiPerfil(
            @AuthenticationPrincipal Usuario usuario, // inyecta directamente la entidad Usuario (que implementa UserDetails)
            @Valid @RequestBody UsuarioUpdateRequestDTO updateRequest) {
        UsuarioResponseDTO usuarioActualizado = usuarioService.actualizarUsuario(usuario.getId(), updateRequest);
        return ResponseEntity.ok(usuarioActualizado);
    }
}
