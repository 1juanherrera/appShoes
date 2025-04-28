package com.api.webapp.repository;

import com.api.webapp.model.entity.DetalleOrden;
import com.api.webapp.model.entity.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleOrdenRepository extends JpaRepository<DetalleOrden, Long> {

    List<DetalleOrden> findByOrden(Orden orden);

    List<DetalleOrden> findByOrdenId(Long ordenId);
}
