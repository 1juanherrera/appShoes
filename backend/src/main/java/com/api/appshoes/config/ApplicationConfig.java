package com.api.appshoes.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.api.appshoes.config.security.UserDetailsServiceImpl;
import com.api.appshoes.repository.UsuarioRepository;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UsuarioRepository usuarioRepository;

    // Bean para el codificador de contraseñas (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean carga los detalles del usuario por email - La implementacion real esta en el paquete security
    @Bean
    public UserDetailsService userDetailsService() {
        // Devuelve una instancia de la implementacion personalizada
        return new UserDetailsServiceImpl(usuarioRepository);
    }

    // Bean para el proveedor de autenticacion que usa nuestro UserDetailsService y PasswordEncoder
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // Bean para el AuthenticationManager, necesario para el proceso de login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager(); // Obtiene el AuthenticationManager de la configuracion de Spring Security
    }
}
