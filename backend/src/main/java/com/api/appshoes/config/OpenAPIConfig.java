package com.api.appshoes.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    // Opcional: Leer valores desde application.properties
    @Value("${spring.application.name}")
    private String appName;

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "jwtBearer"; // Nombre esquema de seguridad JWT

        return new OpenAPI()
                // Informacion general de la API
                .info(new Info()
                        .title(appName + " API")
                        .version("v1.0.0")
                        .description("API REST para la Tienda de Cafe Aurea.")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                // Añadir requerimiento de seguridad global
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                // Definir el esquema de seguridad JWT
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP) // Tipo HTTP para Bearer
                                        .scheme("bearer") // Esquema Bearer
                                        .bearerFormat("JWT") // Formato del token
                        )
                );
    }
}
