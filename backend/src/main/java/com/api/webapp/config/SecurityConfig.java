package com.api.webapp.config;

import com.api.webapp.config.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays; // Import útil si reviertes a usar split
import java.util.List;
import org.springframework.security.config.Customizer; // Import necesario


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    // Bean CorsConfigurationSource que define la configuración CORS
    @Bean
    CorsConfigurationSource corsConfigurationSource(@Value("${cors.allowed.origins}") String allowedOriginsValue) {
        // Aunque inyectamos el valor de properties, NO lo usamos abajo
        // para evitar el error que tenías. Usamos el valor hardcodeado.
        CorsConfiguration configuration = new CorsConfiguration();

        // --- 👇 ORIGEN PERMITIDO HARDCODEADO (ESTA FUE LA SOLUCIÓN) 👇 ---
        // Establecemos directamente el origen que sabemos que funciona.
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        // --- ------------------------------------------------------- ---

        // --- Línea original que leía de properties (comentada para referencia) ---
        // configuration.setAllowedOrigins(Arrays.asList(allowedOriginsValue.split(",")));
        // --- ----------------------------------------------------------------- ---

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // --- 👇 REVIERTE ESTO A CABECERAS ESPECÍFICAS SI YA FUNCIONA 👇 ---
        // Es más seguro permitir solo las cabeceras necesarias.
        // configuration.setAllowedHeaders(List.of("*")); // Temporal que usamos antes
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "X-Requested-With", "Accept", "Origin")); // Lista específica recomendada
        // --- --------------------------------------------------------- ---

        configuration.setAllowCredentials(true);
        // configuration.setMaxAge(3600L); // Puedes descomentar si necesitas cachear preflight

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration); // Aplica a /api/*
        return source;
    }

    // Método securityFilterChain completo (sin cambios respecto a la última versión funcional)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilita CSRF
                .cors(Customizer.withDefaults()) // Aplica la configuración CORS del bean 'corsConfigurationSource'
                .authorizeHttpRequests(auth -> auth // Comienza la configuración de autorización
                        .requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll() // Permite preflight OPTIONS explícitamente PRIMERO

                        // Endpoints públicos
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/productos", "/api/productos/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categorias", "/api/categorias/**").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/api-docs/**"
                        ).permitAll()

                        // Endpoints de ADMINISTRADOR
                        .requestMatchers("/api/admin/usuarios", "/api/admin/usuarios/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.POST, "/api/admin/productos").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PUT, "/api/admin/productos/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/productos/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/admin/productos/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.POST, "/api/admin/categorias").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PUT, "/api/admin/categorias/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/categorias/**").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/ordenes/*/estado").hasRole("ADMINISTRADOR")
                        .requestMatchers(HttpMethod.GET, "/api/ordenes/todas").hasRole("ADMINISTRADOR")

                        // Endpoints que requieren autenticacion
                        .requestMatchers("/api/carrito/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/ordenes").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/ordenes/mis-ordenes").authenticated()
                        .requestMatchers("/api/usuarios/me").authenticated()

                        // Cualquier otra solicitud requiere autenticación (SIEMPRE AL FINAL)
                        .anyRequest().authenticated()
                ) // Termina la configuración de authorizeHttpRequests
                .sessionManagement(session -> session // Comienza la configuración de sesión
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Sesión sin estado (para JWT)
                ) // Termina la configuración de sesión
                .authenticationProvider(authenticationProvider) // Establece el proveedor de autenticación
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Añade el filtro JWT antes del filtro estándar

        // Construye y devuelve la cadena de filtros de seguridad
        return http.build();
    }
}