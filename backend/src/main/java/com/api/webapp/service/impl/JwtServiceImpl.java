package com.api.webapp.service.impl;

import com.api.webapp.service.JwtService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtServiceImpl implements JwtService {

    // Logger para registrar informacion o errores
    private static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    @Value("${jwt.secret}")
    private String secretKeyString;

    @Value("${jwt.expiration.ms}")
    private long jwtExpiration;

    private SecretKey signingKey;

    // Inicializacion de la clave
    @jakarta.annotation.PostConstruct
    public void init() {
        this.signingKey = generateSigningKey();
        logger.info("Clave de firma HMAC SHA-512 inicializada.");
    }

    // Extrae el nombre de usuario (email)
    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // El subject es el nombre de usuario (email)
    }

    // Extrae un claim específico del token usando una funcion resolver
    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (JwtException | IllegalArgumentException error) {
            logger.warn("No se pudo extraer el claim del token: {}", error.getMessage());
            throw new JwtException("Error al extraer claim: " + error.getMessage(), error);
        }
    }

    // Genera un token JWT para el usuario dado
    @Override
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> extraClaims = new HashMap<>();
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        extraClaims.put("roles", roles);
        return generateToken(extraClaims, userDetails);
    }

    // Genera un token JWT con claims adicionales
    @Override
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .claims()
                    .add(extraClaims) // añade el mapa de claims extras
                    .subject(userDetails.getUsername())
                    .issuedAt(now)
                    .expiration(expiryDate)
                .and() // Vuelve al constructor principal de JwsHeader
                .signWith(getSigningKey())
                .compact(); // Construye el token
    }

    // Valida si un token JWT es valido para un usuario especifico
    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token); // valida la estructura y expiracion indirectamente
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (JwtException | IllegalArgumentException error) {
            logger.warn("Validación de token fallida para el usuario {}: {}", userDetails.getUsername(), error.getMessage());
            return false;
        }
    }


    // Verifica si un token ha expirado comparando su fecha de expiracion con la actual
    private boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (ExpiredJwtException ex) {
            return true;
        } catch (JwtException | IllegalArgumentException error) {
            logger.warn("Error al verificar expiración, tratando token como inválido: {}", error.getMessage());
            return true;
        }
    }

    // Extrae la fecha de expiracion del token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extrae todos los claims (payload) del token JWT
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token) // Parsea y valida JWS (firma + payload)
                    .getPayload(); // Obtiene el payload (Claims)
        } catch (ExpiredJwtException error) {
            logger.trace("Token JWT expirado: {}", error.getMessage());
            throw error;

        } catch (UnsupportedJwtException error) { // si el token no es soportado
            logger.error("Tipo de token JWT no soportado: {}", error.getMessage());
            throw error;

        } catch (MalformedJwtException error) { // si el token esta mal formado
            logger.error("Token JWT malformado: {}", error.getMessage());
            throw error;

        } catch (SignatureException error) { // si la firma es invalida
            logger.error("Firma JWT inválida: {}", error.getMessage());
            throw error;

        } catch (IllegalArgumentException error) { // si el token es nulo o vacio
            logger.error("Argumento JWT inválido o token vacío: {}", error.getMessage());
            throw error;

        } catch (JwtException error) { // Captura generica para otros posibles errores JWT
            logger.error("Error inesperado en JWT: {}", error.getMessage());
            throw error;
        }
    }

    // Obtiene la SecretKey usada para firmar y verificar tokens
    private SecretKey getSigningKey() {
        // Devuelve la clave ya inicializada en init()
        if (this.signingKey == null) {
            logger.warn("SigningKey no fue inicializada, intentando generar ahora.");
            this.signingKey = generateSigningKey();
        }
        return this.signingKey;
    }

    // Genera la SecretKey a partir del string Base64.
    private SecretKey generateSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secretKeyString);
        return Keys.hmacShaKeyFor(keyBytes); // Keys.hmacShaKeyFor genera una clave adecuada para HS256, HS384 y HS512
    }
}
