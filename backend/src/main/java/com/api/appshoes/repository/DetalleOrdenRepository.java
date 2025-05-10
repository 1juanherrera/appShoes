package com.api.appshoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.appshoes.model.entity.DetalleOrden;
import com.api.appshoes.model.entity.Orden;

import java.util.List;

@Repository
public interface DetalleOrdenRepository extends JpaRepository<DetalleOrden, Long> {

    List<DetalleOrden> findByOrden(Orden orden);

    List<DetalleOrden> findByOrdenId(Long ordenId);
}
