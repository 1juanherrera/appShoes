package com.api.webapp.model.dto.request;

import com.api.webapp.model.enums.EstadoOrden;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrdenStatusUpdateRequestDTO {
    @NotNull(message = "El nuevo estado de la orden es requerido")
    private EstadoOrden estado;
}
