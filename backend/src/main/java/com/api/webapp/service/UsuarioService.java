package com.api.webapp.service;

import com.api.webapp.model.dto.request.LoginRequestDTO;
import com.api.webapp.model.dto.request.RegistroUsuarioRequestDTO;
import com.api.webapp.model.dto.request.UsuarioUpdateRequestDTO;
import com.api.webapp.model.dto.response.JwtResponseDTO;
import com.api.webapp.model.dto.response.UsuarioResponseDTO;

import java.util.List;

public interface UsuarioService {

    UsuarioResponseDTO registrarUsuario(RegistroUsuarioRequestDTO registroRequest);

    UsuarioResponseDTO actualizarUsuario(Long id, UsuarioUpdateRequestDTO updateRequest);

    JwtResponseDTO autenticarUsuario(LoginRequestDTO loginRequest);

    UsuarioResponseDTO obtenerUsuarioResponsePorId(Long id);

    List<UsuarioResponseDTO> listarUsuarios(); // Para Admin

    void eliminarUsuario(Long id); // Para Admin
}
