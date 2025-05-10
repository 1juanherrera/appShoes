package com.api.appshoes.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Para cuando no se encuentra una entidad por su ID etc

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private final String nombreRecurso;
    private final String nombreCampo;
    private final Object valorCampo;

    public ResourceNotFoundException(String nombreRecurso, String nombreCampo, Object valorCampo) {
        // Mensaje construido para ser informativo
        super(String.format("%s no encontrado con %s : '%s'", nombreRecurso, nombreCampo, valorCampo));
        this.nombreRecurso = nombreRecurso;
        this.nombreCampo = nombreCampo;
        this.valorCampo = valorCampo;
    }

    public ResourceNotFoundException(String message) {
        super(message);
        this.nombreRecurso = "Recurso";
        this.nombreCampo = "valor";
        this.valorCampo = "desconocido";
    }

    // Constructor con causa
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
        this.nombreRecurso = "Recurso";
        this.nombreCampo = "valor";
        this.valorCampo = "desconocido";
    }
}
