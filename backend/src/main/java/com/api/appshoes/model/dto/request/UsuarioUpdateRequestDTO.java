package com.api.appshoes.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioUpdateRequestDTO {

    @NotBlank(message = "Los nombres son requeridos")
    @Size(max = 70, message = "Los nombres no pueden exceder los 70 caracteres")
    private String nombres;

    @NotBlank(message = "Los apellidos son requeridos")
    @Size(max = 70, message = "Los apellidos no pueden exceder los 70 caracteres")
    private String apellidos;

    @Size(max = 20, message = "El contacto no puede exceder los 20 caracteres")
    private String contacto; // actualizar/borrar

    @Size(max = 255, message = "La dirección no puede exceder los 255 caracteres")
    private String direccion; // actualizar/borrar
}
