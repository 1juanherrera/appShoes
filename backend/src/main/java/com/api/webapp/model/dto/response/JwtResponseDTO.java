package com.api.webapp.model.dto.response;

import com.api.webapp.model.enums.Rol;
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
