package com.api.appshoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.appshoes.model.entity.CarritoItem;
import com.api.appshoes.model.entity.Producto;
import com.api.appshoes.model.entity.Usuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {

    // Busca todos los items del carrito para un usuario específico
    List<CarritoItem> findByUsuario(Usuario usuario);

    List<CarritoItem> findByUsuarioId(Long usuarioId);

    // Busca un item específico en el carrito por usuario y producto
    Optional<CarritoItem> findByUsuarioAndProducto(Usuario usuario, Producto producto);

    Optional<CarritoItem> findByUsuarioIdAndProductoId(Long usuarioId, Long productoId);

    // Elimina un item específico por usuario y producto
    void deleteByUsuarioAndProducto(Usuario usuario, Producto producto);

    // Elimina todos los items del carrito de un usuario
    void deleteByUsuario(Usuario usuario);
}
