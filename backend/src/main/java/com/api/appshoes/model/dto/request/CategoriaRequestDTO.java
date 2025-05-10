package com.api.appshoes.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaRequestDTO {

    @NotBlank(message = "El nombre de la categoría es requerido")
    @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres")
    private String nombre;
}
