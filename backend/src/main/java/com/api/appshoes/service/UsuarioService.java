package com.api.appshoes.service;

import java.util.List;

import com.api.appshoes.model.dto.request.LoginRequestDTO;
import com.api.appshoes.model.dto.request.RegistroUsuarioRequestDTO;
import com.api.appshoes.model.dto.request.UsuarioUpdateRequestDTO;
import com.api.appshoes.model.dto.response.JwtResponseDTO;
import com.api.appshoes.model.dto.response.UsuarioResponseDTO;

public interface UsuarioService {

    JwtResponseDTO registrarUsuario(RegistroUsuarioRequestDTO registroRequest);

    UsuarioResponseDTO actualizarUsuario(Long id, UsuarioUpdateRequestDTO updateRequest);

    JwtResponseDTO autenticarUsuario(LoginRequestDTO loginRequest);

    UsuarioResponseDTO obtenerUsuarioResponsePorId(Long id);

    List<UsuarioResponseDTO> listarUsuarios(); // Para Admin

    void eliminarUsuario(Long id); // Para Admin
}
