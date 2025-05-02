-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2025 a las 04:53:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appshoes_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_ctg` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_ctg`, `nombre`) VALUES
(6, 'Adidas'),
(1, 'Deportes'),
(2, 'Formal'),
(3, 'Guayos'),
(4, 'Mocasines'),
(7, 'New Balance'),
(5, 'Nike'),
(8, 'Puma');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_ordenes`
--

CREATE TABLE `detalles_ordenes` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `orden_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_ordenes`
--

INSERT INTO `detalles_ordenes` (`id`, `cantidad`, `precio`, `orden_id`, `producto_id`) VALUES
(1, 1, 149.99, 1, 8),
(2, 1, 139.99, 1, 9),
(3, 1, 109.99, 1, 14),
(4, 1, 90.99, 1, 1),
(5, 1, 90.99, 2, 1),
(6, 3, 79.99, 2, 3),
(7, 1, 90.99, 3, 1),
(8, 1, 119.00, 3, 2),
(9, 1, 79.99, 3, 3),
(10, 1, 90.99, 4, 1),
(11, 1, 119.00, 5, 2),
(12, 1, 79.99, 5, 3),
(13, 1, 149.99, 6, 8),
(14, 1, 89.99, 6, 7),
(15, 1, 89.99, 6, 11),
(16, 1, 59.99, 7, 4),
(17, 1, 49.99, 7, 5),
(18, 1, 90.99, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_prod` bigint(20) NOT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'1',
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `categoria_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_prod`, `activo`, `descripcion`, `imagen`, `nombre`, `precio`, `stock`, `categoria_id`) VALUES
(1, b'1', 'Tenis Adidas Galaxy 6 con diseño moderno y suela amortiguada para mayor comodidad diaria.', 'https://acortar.link/k0zGts', 'Tenis Adidas Galaxy 6', 90.99, 45, 6),
(2, b'1', 'Zapatillas Adidas Ultraboost con tejido Primeknit y suela Boost para máximo confort y rendimiento.', 'https://acortar.link/mVMIXJ', 'Zapatillas Adidas Ultraboost', 119.00, 23, 6),
(3, b'1', 'Zapatos Nike Downshifter 13, ligeras y transpirables para mayor comodidad en cada paso.', 'https://acortar.link/jxEu1U', 'Nike Downshifter 13', 79.99, 18, 5),
(4, b'1', 'Zapatillas ligeras y transpirables para correr largas distancias.', 'https://acortar.link/t3HCE0', 'Zapatillas para Running', 59.99, 99, 1),
(5, b'1', 'Zapatos versátiles para entrenamientos en el gimnasio.', 'https://acortar.link/ZVOIfP', 'Zapatos para Entrenamiento', 49.99, 79, 1),
(6, b'1', 'Zapatos elegantes de cuero genuino para ocasiones formales.', 'https://acortar.link/VZds3z', 'Zapatos Formales de Cuero', 99.99, 40, 2),
(7, b'1', 'Zapatos clásicos Oxford en color negro.', 'https://acortar.link/YQ2hLH', 'Zapatos Oxford Negros', 89.99, 29, 2),
(8, b'1', 'Guayos de alto rendimiento para fútbol, con diseño Predator.', 'https://acortar.link/l67wak', 'Guayos Adidas Predator', 149.99, 23, 3),
(9, b'1', 'Guayos ligeros y veloces para jugadores de fútbol.', 'https://acortar.link/kmApyO', 'Guayos Nike Mercurial', 139.99, 19, 3),
(10, b'1', 'Mocasines elegantes hechos de cuero marrón.', 'https://acortar.link/MpOUF5', 'Mocasines de Cuero Marrón', 79.99, 50, 4),
(11, b'1', 'Mocasines clásicos en color negro para ocasiones formales.', 'https://acortar.link/oFFLVG', 'Mocasines Negros Elegantes', 89.99, 39, 4),
(12, b'1', 'Zapatillas icónicas de New Balance con estilo retro.', 'https://acortar.link/g5ti7R', 'Zapatillas New Balance 574', 99.99, 60, 7),
(13, b'1', 'Zapatillas cómodas con tecnología Fresh Foam para correr.', 'https://acortar.link/XS6tLb', 'Zapatillas New Balance Fresh Foam', 109.99, 50, 7),
(14, b'1', 'Zapatillas cómodas con tecnología Fresh Foam para correr.', 'https://acortar.link/YcY4GX', 'Zapatillas New Balance Fresh Foam', 109.99, 49, 7),
(15, b'1', 'Zapatillas ligeras y cómodas para correr.', 'https://acortar.link/axU27Y', 'Zapatillas Nike Revolution', 79.99, 90, 5),
(16, b'1', 'Zapatillas modernas con diseño audaz de Puma.', 'https://acortar.link/e2MVnv', 'Zapatillas Puma RS-X', 119.99, 50, 8),
(17, b'1', 'Zapatillas clásicas de gamuza de Puma.', 'https://acortar.link/SykPGs', 'Zapatillas Puma Suede', 89.99, 60, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usr` bigint(20) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `contacto` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `rol` enum('ADMINISTRADOR','USUARIO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usr`, `apellidos`, `contacto`, `contrasena`, `direccion`, `email`, `nombre_usuario`, `nombres`, `rol`) VALUES
(1, 'Herrera', '123456789', '$2a$10$zn84JZ7/q9hENU7jyBOSMeNJDvA1WwSyAGyFqmVfEya6HOq31M3Ve', 'Avenida Longsville 1', 'juan.herrera@example.com', '1juanherrera', 'Juan', 'ADMINISTRADOR'),
(2, 'Peñaranda', '+1 56 265 2584', '$2a$10$68VB0HMnb5TDRCPcovzriOlsQi2zvI31w12iLQtHeohcAwiDZukUm', 'Avenida Longsville', 'camp@example.com', 'andrvillanueva', 'Camila', 'USUARIO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_carrito_usuario_producto` (`usuario_id`,`producto_id`),
  ADD KEY `fk_carrito_producto` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_ctg`),
  ADD UNIQUE KEY `uk_categoria_nombre` (`nombre`);

--
-- Indices de la tabla `detalles_ordenes`
--
ALTER TABLE `detalles_ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_detalle_producto` (`producto_id`),
  ADD KEY `fk_detalle_orden` (`orden_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `fk_producto_categoria` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usr`),
  ADD UNIQUE KEY `uk_usuario_email` (`email`),
  ADD UNIQUE KEY `uk_usuario_nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `UKag9pe8ldy3j2eevhyd26pbyte` (`email`,`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_ctg` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detalles_ordenes`
--
ALTER TABLE `detalles_ordenes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_prod` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usr` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_carrito_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id_prod`),
  ADD CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usr`);

--
-- Filtros para la tabla `detalles_ordenes`
--
ALTER TABLE `detalles_ordenes`
  ADD CONSTRAINT `fk_detalle_orden` FOREIGN KEY (`orden_id`) REFERENCES `ordenes` (`id`),
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id_prod`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id_ctg`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
