package com.api.webapp.service.impl;

import com.api.webapp.exception.*;
import com.api.webapp.model.dto.request.*;
import com.api.webapp.model.dto.response.*;
import com.api.webapp.model.entity.Usuario;
import com.api.webapp.model.enums.Rol;
import com.api.webapp.repository.UsuarioRepository;
import com.api.webapp.service.JwtService;
import com.api.webapp.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

        private final UsuarioRepository usuarioRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        @Override
        @Transactional
        public JwtResponseDTO registrarUsuario(RegistroUsuarioRequestDTO registroRequest) {
            // Verificar si el email o nombre de usuario ya existen
            if (usuarioRepository.existsByEmail(registroRequest.getEmail())) {
                throw new EmailAlreadyExistsException("El email ya está registrado: " + registroRequest.getEmail());
            }
            if (usuarioRepository.existsByNombreUsuario(registroRequest.getNombreUsuario())) {
                throw new UsernameAlreadyExistsException("El nombre de usuario ya está en uso: " + registroRequest.getNombreUsuario());
            }
        
            // Crear un nuevo usuario
            Usuario nuevoUsuario = Usuario.builder()
                    .nombres(registroRequest.getNombres())
                    .apellidos(registroRequest.getApellidos())
                    .email(registroRequest.getEmail())
                    .nombreUsuario(registroRequest.getNombreUsuario())
                    .contacto(registroRequest.getContacto())
                    .direccion(registroRequest.getDireccion())
                    .contrasena(passwordEncoder.encode(registroRequest.getContrasena()))
                    .rol(Rol.USUARIO)
                    .build();
        
            // Guardar el usuario en la base de datos
            Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
        
            // Generar un token JWT para el usuario registrado
            String jwtToken = jwtService.generateToken(usuarioGuardado);
        
            // Devolver el token y los datos del usuario
            return JwtResponseDTO.builder()
                    .token(jwtToken)
                    .nombreUsuario(usuarioGuardado.getNombreUsuario())
                    .email(usuarioGuardado.getEmail())
                    .rol(usuarioGuardado.getRol())
                    .build();
        }

    @Override
    @Transactional
    public UsuarioResponseDTO actualizarUsuario(Long id, UsuarioUpdateRequestDTO updateRequest) {
        Usuario usuarioExistente = findUsuarioByIdOrElseThrow(id);

        usuarioExistente.setNombres(updateRequest.getNombres());
        usuarioExistente.setApellidos(updateRequest.getApellidos());
        usuarioExistente.setContacto(updateRequest.getContacto());
        usuarioExistente.setDireccion(updateRequest.getDireccion());

        Usuario usuarioActualizado = usuarioRepository.save(usuarioExistente);
        return mapUsuarioToUsuarioResponseDTO(usuarioActualizado);
    }

    @Override
    public JwtResponseDTO autenticarUsuario(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getContrasena())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Usuario usuario = (Usuario) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(usuario);

        return JwtResponseDTO.builder()
                .token(jwtToken)
                .rol(usuario.getRol())
                .nombreUsuario(usuario.getNombreUsuario())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponseDTO obtenerUsuarioResponsePorId(Long id) {
        Usuario usuario = findUsuarioByIdOrElseThrow(id);
        return mapUsuarioToUsuarioResponseDTO(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapUsuarioToUsuarioResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario", "id", id);
        }
        usuarioRepository.deleteById(id);
    }


    // Metodos privado
    private Usuario findUsuarioByIdOrElseThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
    }

    private UsuarioResponseDTO mapUsuarioToUsuarioResponseDTO(Usuario usuario) {
        if (usuario == null) return null;
        return UsuarioResponseDTO.builder()
                .id(usuario.getId())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .email(usuario.getEmail())
                .nombreUsuario(usuario.getNombreUsuario())
                .contacto(usuario.getContacto())
                .direccion(usuario.getDireccion())
                .rol(usuario.getRol())
                .build();
    }
}
