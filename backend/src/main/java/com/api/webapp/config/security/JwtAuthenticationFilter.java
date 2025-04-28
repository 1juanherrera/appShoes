package com.api.webapp.config.security;

import com.api.webapp.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger filterLogger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain // Cadena de filtros de Spring Security
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization"); // Obtener el header Authorization
        final String jwt;
        final String userEmail;

        // 1. Si no hay header Authorization o no empieza con Bearer, continuar al siguiente filtro
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraer el token (removiendo "Bearer ")
        jwt = authHeader.substring(7);

        try {
            // 3. Extraer el email del token usando JwtService
            userEmail = jwtService.extractUsername(jwt);

            // 4. Si se extrajo el email y NO hay autenticación previa en el contexto de seguridad actual
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // 5. Cargar los detalles del usuario desde la BD usando UserDetailsService
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                // 6. Validar el token
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    // 7. Si el token es valido, crear un objeto de autenticacion
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                                                        userDetails, // Principal (el objeto UserDetails)
                                                                        null,        // Credenciales (null porque ya validamos con JWT)
                                                                        userDetails.getAuthorities() // Roles/Permisos
                                                                                                            );
                    // Añadir detalles de la solicitud web al token de autenticacion
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 8. Establecer la autenticación en el contexto de seguridad de Spring
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    filterLogger.debug("Usuario '{}' autenticado correctamente vía JWT.", userEmail);
                } else {
                    filterLogger.warn("Token JWT inválido para usuario '{}'.", userEmail);
                }
            }
        } catch (ExpiredJwtException error) {
            filterLogger.warn("Token JWT expirado: {}", error.getMessage());
            SecurityContextHolder.clearContext();

        } catch (JwtException | IllegalArgumentException error) {
            filterLogger.error("Error al procesar token JWT: {}", error.getMessage());
            SecurityContextHolder.clearContext();
        }
        // 9. Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
