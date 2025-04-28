package com.api.webapp.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT", name = "id_prod")
    private Long id;

    @Column(nullable = false)
    private String nombre;


    @Column
    private String descripcion;

    @Column(nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Double precio;

    @Column
    private String imagen;

    @Column(nullable = false, columnDefinition = "INTEGER")
    private Integer stock;

    @Column(nullable = false)
    @ColumnDefault("true") // Corrección: El valor por defecto en @ColumnDefault es solo el valor, sin "BOOLEAN DEFAULT"
    private Boolean activo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", foreignKey = @ForeignKey(name = "fk_producto_categoria"), nullable = true)
    @ToString.Exclude
    private Categoria categoria;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<CarritoItem> carritoItems;

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<DetalleOrden> detalleOrdens;
}