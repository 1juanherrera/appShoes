package com.api.appshoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.appshoes.model.entity.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    Boolean existsByEmail(String email);

    Boolean existsByNombreUsuario(String nombreUsuario);
}
