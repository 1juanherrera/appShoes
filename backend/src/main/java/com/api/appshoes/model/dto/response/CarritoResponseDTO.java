package com.api.appshoes.model.dto.response;

import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarritoResponseDTO {
    private List<CarritoItemResponseDTO> items;
    private Double total;
}
