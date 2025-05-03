-- Insertar datos en la tabla `categorias`
INSERT IGNORE INTO `categorias` (`id_ctg`, `nombre`) VALUES
(6, 'Adidas'),
(1, 'Deportes'),
(2, 'Formal'),
(3, 'Guayos'),
(4, 'Mocasines'),
(7, 'New Balance'),
(5, 'Nike'),
(8, 'Puma');

-- Insertar datos en la tabla `productos`
INSERT IGNORE INTO `productos` (`id_prod`, `activo`, `descripcion`, `imagen`, `nombre`, `precio`, `stock`, `categoria_id`) VALUES
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

-- Insertar datos en la tabla `usuarios`
INSERT IGNORE INTO `usuarios` (`id_usr`, `apellidos`, `contacto`, `contrasena`, `direccion`, `email`, `nombre_usuario`, `nombres`, `rol`) VALUES
(1, 'Herrera', '123456789', '$2a$10$zn84JZ7/q9hENU7jyBOSMeNJDvA1WwSyAGyFqmVfEya6HOq31M3Ve', 'Avenida Longsville 1', 'juan.herrera@example.com', '1juanherrera', 'Juan', 'ADMINISTRADOR'),
(2, 'Peñaranda', '+1 56 265 2584', '$2a$10$68VB0HMnb5TDRCPcovzriOlsQi2zvI31w12iLQtHeohcAwiDZukUm', 'Avenida Longsville', 'camp@example.com', 'andrvillanueva', 'Camila', 'USUARIO');

-- Insertar datos en la tabla `ordenes`
INSERT IGNORE INTO `ordenes` (`id`, `estado`, `fecha`, `total`, `usuario_id`) VALUES
(1, 'COMPLETADA', '2025-05-01 10:00:00', 480.96, 1),
(2, 'PENDIENTE', '2025-05-02 12:30:00', 249.97, 2),
(3, 'CANCELADA', '2025-05-02 15:45:00', 289.98, 1),
(4, 'COMPLETADA', '2025-05-03 09:20:00', 90.99, 1),
(5, 'PENDIENTE', '2025-05-03 11:00:00', 198.99, 2),
(6, 'COMPLETADA', '2025-05-03 14:00:00', 329.97, 1),
(7, 'PENDIENTE', '2025-05-03 16:30:00', 109.98, 2),
(8, 'CANCELADA', '2025-05-03 18:00:00', 90.99, 1);

-- Insertar datos en la tabla `detalles_ordenes`
INSERT IGNORE INTO `detalles_ordenes` (`id`, `cantidad`, `precio`, `orden_id`, `producto_id`) VALUES
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