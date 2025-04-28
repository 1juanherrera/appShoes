package com.api.webapp.repository;

import com.api.webapp.model.entity.Orden;
import com.api.webapp.model.entity.Usuario;
import com.api.webapp.model.enums.EstadoOrden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    // Busca todas las órdenes de un usuario específico, ordenadas por fecha descendente
    List<Orden> findByUsuarioOrderByFechaDesc(Usuario usuario);

    List<Orden> findByUsuarioIdOrderByFechaDesc(Long usuarioId);

    // Busca órdenes por estado (útil para el administrador)
    List<Orden> findByEstado(EstadoOrden estado);
}
