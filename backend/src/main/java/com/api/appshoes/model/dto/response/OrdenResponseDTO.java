package com.api.appshoes.model.dto.response;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;

import com.api.appshoes.model.enums.EstadoOrden;
import com.fasterxml.jackson.annotation.JsonInclude;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrdenResponseDTO {
    private Long id;
    private Double total;
    private EstadoOrden estado;
    private OffsetDateTime fecha;
    private UsuarioResponseDTO usuario;
    private List<DetalleOrdenResponseDTO> detalles;
}
