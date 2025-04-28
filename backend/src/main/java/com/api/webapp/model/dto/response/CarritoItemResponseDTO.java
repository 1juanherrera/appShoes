package com.api.webapp.model.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItemResponseDTO {
    private Long id;
    private Integer cantidad;
    private ProductoResponseDTO producto;
}
