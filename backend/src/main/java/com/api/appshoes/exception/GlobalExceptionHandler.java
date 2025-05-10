package com.api.appshoes.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.api.appshoes.model.dto.error.ErrorResponseDTO;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Manejador para ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error(HttpStatus.NOT_FOUND.getReasonPhrase())
                .message(ex.getMessage()) // Usa el mensaje de la excepción
                .path(request.getDescription(false).replace("uri=", "")) // la URI de la solicitud
                .build();

        logger.warn("Recurso no encontrado: {} en {}", ex.getMessage(), errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // Manejador para EmailAlreadyExistsException
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleEmailAlreadyExistsException(
            EmailAlreadyExistsException ex, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.CONFLICT.value())
                .error(HttpStatus.CONFLICT.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        logger.warn("Conflicto - Email ya existe: {} en {}", ex.getMessage(), errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    // Manejador para UsernameAlreadyExistsException
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameAlreadyExistsException(
            UsernameAlreadyExistsException ex, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.CONFLICT.value())
                .error(HttpStatus.CONFLICT.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .build();
        logger.warn("Conflicto - Username ya existe: {} en {}", ex.getMessage(), errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    // Manejador para BadRequestException
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadRequestException(
            BadRequestException ex, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        logger.warn("Solicitud incorrecta: {} en {}", ex.getMessage(), errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }


    // Manejador para errores de validación (@Valid en DTOs)
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("Error de Validación: " + errors.toString()) // Mensaje más detallado
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        logger.warn("Error de validación: {} en {}", errors, errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    // Manejador para JSON mal formado o ilegible
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("La solicitud JSON está mal formada o es ilegible. Causa: " + ex.getLocalizedMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        logger.warn("JSON mal formado: {} en {}", ex.getMessage(), errorDetails.getPath());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }


    // Manejador para cualquier otra excepción no capturada específicamente
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGlobalException(
            Exception ex, WebRequest request) {

        ErrorResponseDTO errorDetails = ErrorResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("Ocurrió un error interno inesperado: " + ex.getMessage())
                .path(request.getDescription(false).replace("uri=", ""))
                .build();

        logger.error("Error interno no manejado en {}: ", errorDetails.getPath(), ex);
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

