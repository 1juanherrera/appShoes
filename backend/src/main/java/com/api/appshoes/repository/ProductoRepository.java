package com.api.appshoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.appshoes.model.entity.Categoria;
import com.api.appshoes.model.entity.Producto;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByCategoria(Categoria categoria);

    List<Producto> findByCategoriaId(Long categoriaId);

    List<Producto> findByPrecioBetween(Double precioMin, Double precioMax);

    List<Producto> findByStockGreaterThanEqual(Integer stockMin);

    // Busca por nombre y categoría
    List<Producto> findByNombreContainingIgnoreCaseAndCategoriaId(String nombre, Long categoriaId);
}
