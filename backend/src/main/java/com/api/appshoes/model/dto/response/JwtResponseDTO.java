package com.api.appshoes.model.dto.response;

import com.api.appshoes.model.enums.Rol;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseDTO {
    private String token;
    private String nombreUsuario;
    private String email;
    private Rol rol;
}
