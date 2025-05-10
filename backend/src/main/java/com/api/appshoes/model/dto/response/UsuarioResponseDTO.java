package com.api.appshoes.model.dto.response;

import com.api.appshoes.model.enums.Rol;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsuarioResponseDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String email;
    private String nombreUsuario;
    private String contacto;
    private String direccion;
    private Rol rol;
}
