# APPSHOES

## Introducción
Este manual describe cómo utilizar el sistema de gestión de productos de la aplicación **AppShoes**. La aplicación permite a los usuarios visualizar productos, agregar productos al carrito, buscar productos y gestionar el inventario desde el backend.

---

## 1. Acceso al Sistema

### Inicio de Sesión:
- Accede a la aplicación desde la URL proporcionada.
- Ingresa tus credenciales (usuario y contraseña) para iniciar sesión.

### Navegación:
- Una vez dentro, utiliza el menú principal para acceder a las diferentes secciones:
  - **Productos:** Visualiza la lista de productos disponibles.
  - **Carrito:** Gestiona los productos agregados al carrito.
  - **Categorías:** Filtra productos por categorías.

---

## 2. Visualización de Productos

### Lista de Productos:
- En la página principal, se muestra una lista de productos con la siguiente información:
  - Nombre del producto.
  - Imagen del producto.
  - Descripción breve.
  - Precio.
  - Disponibilidad (activo/inactivo).
  - Stock disponible.

### Detalles del Producto:
- Haz clic en cualquier producto para ver sus detalles completos:
  - Descripción extendida.
  - Precio.
  - Estado (activo/inactivo).
  - Stock disponible.

---

## 3. Gestión del Carrito

### Agregar al Carrito:
- En la lista de productos, haz clic en el botón **Agregar al carrito** (ícono de carrito).
- Si el producto se agrega correctamente, aparecerá un mensaje de confirmación: **"Producto agregado al carrito"**.

### Visualizar el Carrito:
- Accede a la sección **Carrito** desde el menú principal.
- Aquí podrás ver los productos agregados, junto con la cantidad seleccionada.

### Eliminar del Carrito:
- En la sección del carrito, haz clic en el botón **Eliminar** junto al producto que deseas quitar.

### Vaciar el Carrito:
- Haz clic en el botón **Vaciar carrito** para eliminar todos los productos del carrito.

---

## 4. Búsqueda de Productos

### Barra de Búsqueda:
- En la parte superior de la página de productos, utiliza la barra de búsqueda para encontrar productos específicos.
- Puedes buscar por:
  - Nombre del producto.
  - Descripción.
  - Precio.
  - Categoría.

### Resultados de la Búsqueda:
- Los productos que coincidan con tu búsqueda se mostrarán en la lista.

---

## 5. Gestión de Productos desde el Backend

### Base de Datos:
- Los productos están almacenados en la tabla `productos` de la base de datos `appshoes_db`.

### Estructura de la Tabla `productos`:
- **id_prod:** Identificador único del producto.
- **activo:** Indica si el producto está activo (1) o inactivo (0).
- **descripcion:** Descripción del producto.
- **imagen:** URL de la imagen del producto.
- **nombre:** Nombre del producto.
- **precio:** Precio del producto.
- **stock:** Cantidad disponible en inventario.
- **categoria_id:** Identificador de la categoría del producto.

### Ejemplo de Consultas SQL:
- **Obtener todos los productos activos:**
  sql
  SELECT * FROM productos WHERE activo = 1;

    Actualizar el stock de un producto
  UPDATE productos SET stock = stock - 1 WHERE id_prod = 1;

6. Funciones del Sistema
Hook useProductos:
Este hook se utiliza para gestionar los productos y el carrito.
Funciones principales:
agregarAlCarrito: Agrega un producto al carrito.
eliminarDelCarrito: Elimina un producto del carrito.
vaciarCarrito: Vacía el carrito.
handleSearch: Filtra productos según la búsqueda.
Hook useCarrito:
Gestiona las operaciones relacionadas con el carrito, como agregar, actualizar y eliminar productos.
Componente Producto:
Renderiza la lista de productos y permite agregar productos al carrito.
Componente DetalleProducto:
Muestra los detalles completos de un producto seleccionado.
7. Solución de Problemas
Producto no encontrado:
Asegúrate de que el identificador del producto (id_prod) en la URL coincida con el de la base de datos.
Verifica que el producto esté activo (activo = 1).
El carrito no se actualiza:
Verifica que el backend esté respondiendo correctamente a las solicitudes.
Asegúrate de que el hook useProductos esté configurado correctamente.
Error al agregar al carrito:
Verifica que el producto tenga stock disponible.
Asegúrate de que el endpoint /carrito/items esté funcionando correctamente.
8. Recomendaciones
Mantenimiento de la Base de Datos:
Revisa periódicamente el stock de los productos y actualiza los precios según sea necesario.
Optimización de Imágenes:
Asegúrate de que las imágenes de los productos estén optimizadas para una carga rápida.
Pruebas del Sistema:
Realiza pruebas regulares para garantizar que todas las funciones (búsqueda, carrito, etc.) funcionen correctamente.
9. Contacto de Soporte
Correo Electrónico: soporte@appshoes.com
Teléfono: +1 800 123 4567
Horario de Atención: Lunes a Viernes, de 9:00 AM a 6:00 PM.
Este manual cubre las funciones principales del sistema de gestión de productos de AppShoes. Si tienes alguna duda o problema, no dudes en contactar al equipo de soporte.