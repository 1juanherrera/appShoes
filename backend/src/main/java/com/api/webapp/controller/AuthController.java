package com.api.webapp.controller;

import com.api.webapp.model.dto.request.LoginRequestDTO;
import com.api.webapp.model.dto.request.RegistroUsuarioRequestDTO;
import com.api.webapp.model.dto.response.JwtResponseDTO;
import com.api.webapp.model.dto.response.UsuarioResponseDTO;
import com.api.webapp.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponseDTO> registrarUsuario(@Valid @RequestBody RegistroUsuarioRequestDTO registroRequest) {
        JwtResponseDTO jwtResponse = usuarioService.registrarUsuario(registroRequest);
        return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> autenticarUsuario(@Valid @RequestBody LoginRequestDTO loginRequest) {
        JwtResponseDTO jwtResponse = usuarioService.autenticarUsuario(loginRequest);
        return ResponseEntity.ok(jwtResponse); // 200 OK con el token y datos
    }
}
