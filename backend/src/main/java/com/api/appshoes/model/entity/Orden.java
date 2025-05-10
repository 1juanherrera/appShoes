package com.api.appshoes.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import com.api.appshoes.model.enums.EstadoOrden;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ordenes")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "usuario_id", foreignKey = @ForeignKey(name = "fk_orden_usuario"), nullable = false)
    @ToString.Exclude
    private Usuario usuario;

    @Column(nullable = false, columnDefinition = "DECIMAL(10,2)")
    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoOrden estado;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private OffsetDateTime fecha;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    private List<DetalleOrden> detalles = new ArrayList<>();

    public void addDetalle(DetalleOrden detalle) {
        this.detalles.add(detalle); // añade a la lista detalles
        detalle.setOrden(this);    // referencia inversa en el detalle
    }
}
