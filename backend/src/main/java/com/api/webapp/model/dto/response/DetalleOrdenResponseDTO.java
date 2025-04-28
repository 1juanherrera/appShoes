package com.api.webapp.model.dto.response;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetalleOrdenResponseDTO {
    private Long id;
    private Integer cantidad;
    private Double precio;
    private ProductoResponseDTO producto;
    private List<DetalleOrdenResponseDTO> detalles;
}
