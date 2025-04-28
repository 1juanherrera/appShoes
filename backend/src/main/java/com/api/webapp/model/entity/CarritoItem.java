package com.api.webapp.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carrito", uniqueConstraints = {
        @UniqueConstraint(name = "uk_carrito_usuario_producto", columnNames = {"usuario_id", "producto_id"})
})
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false, foreignKey = @ForeignKey(name = "fk_carrito_usuario"))
    @ToString.Exclude
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false, foreignKey = @ForeignKey(name = "fk_carrito_producto"))
    @ToString.Exclude
    private Producto producto;

    @Column(nullable = false, columnDefinition = "INTEGER")
    private Integer cantidad;
}
