package com.api.webapp.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistroUsuarioRequestDTO {

    @NotBlank(message = "Los nombres son requeridos")
    @Size(max = 70, message = "Los nombres no pueden exceder los 70 caracteres")
    private String nombres;

    @NotBlank(message = "Los apellidos son requeridos")
    @Size(max = 70, message = "Los apellidos no pueden exceder los 70 caracteres")
    private String apellidos;

    @NotBlank(message = "El email es requerido")
    @Email(message = "El formato del email no es válido")
    @Size(max = 100, message = "El email no puede exceder los 100 caracteres")
    private String email;

    @NotBlank(message = "El nombre de usuario es requerido")
    @Size(max = 70, message = "El nombre de usuario no puede exceder los 70 caracteres")
    private String nombreUsuario;

    @Size(max = 20, message = "El contacto no puede exceder los 20 caracteres")
    private String contacto;

    @Size(max = 255, message = "La dirección no puede exceder los 255 caracteres")
    private String direccion;

    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).*$",
            message = "La contraseña debe contener al menos una mayúscula, una minúscula y un dígito")
    private String contrasena;
}
