package com.api.webapp.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "detalles_ordenes")
public class DetalleOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "orden_id", foreignKey = @ForeignKey(name = "fk_detalle_orden"), nullable = false)
    @ToString.Exclude
    private Orden orden;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false, foreignKey = @ForeignKey(name = "fk_detalle_producto"))
    @ToString.Exclude
    private Producto producto;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Double precio;
}
