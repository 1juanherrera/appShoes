package com.api.appshoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.appshoes.model.entity.Orden;
import com.api.appshoes.model.entity.Usuario;
import com.api.appshoes.model.enums.EstadoOrden;

import java.util.List;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    // Busca todas las órdenes de un usuario específico, ordenadas por fecha descendente
    List<Orden> findByUsuarioOrderByFechaDesc(Usuario usuario);

    List<Orden> findByUsuarioIdOrderByFechaDesc(Long usuarioId);

    // Busca órdenes por estado (útil para el administrador)
    List<Orden> findByEstado(EstadoOrden estado);

    @Query("SELECT o FROM Orden o JOIN FETCH o.usuario")
    List<Orden> findAllWithUsuario();
}
