package com.api.webapp.service.impl;

import com.api.webapp.exception.BadRequestException;
import com.api.webapp.exception.ResourceNotFoundException;
import com.api.webapp.model.dto.request.ProductoRequestDTO;
import com.api.webapp.model.dto.response.ProductoResponseDTO;
import com.api.webapp.model.entity.Categoria;
import com.api.webapp.model.entity.Producto;
import com.api.webapp.repository.CategoriaRepository;
import com.api.webapp.repository.ProductoRepository;
import com.api.webapp.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final CategoriaServiceImpl categoriaServiceMapperDelegate;

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(ProductoServiceImpl.class);

    @Override
    @Transactional
    public ProductoResponseDTO crearProducto(ProductoRequestDTO productoRequest) {
        Categoria categoria = categoriaRepository.findById(productoRequest.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", productoRequest.getCategoriaId()));

        Producto nuevoProducto = Producto.builder()
                .nombre(productoRequest.getNombre())
                .descripcion(productoRequest.getDescripcion())
                .precio(productoRequest.getPrecio())
                .imagen(productoRequest.getImagen())
                .stock(productoRequest.getStock())
                .categoria(categoria)
                .activo(true)
                .build();

        Producto productoGuardado = productoRepository.save(nuevoProducto);

        return mapProductoToProductoResponseDTO(productoGuardado);
    }

    @Override
    @Transactional
    public ProductoResponseDTO actualizarProducto(Long id, ProductoRequestDTO productoRequest) {
        Producto productoExistente = findProductoByIdOrElseThrow(id);
        Categoria categoria = findCategoriaByIdOrElseThrow(productoRequest.getCategoriaId());

        productoExistente.setNombre(productoRequest.getNombre());
        productoExistente.setDescripcion(productoRequest.getDescripcion());
        productoExistente.setPrecio(productoRequest.getPrecio());
        productoExistente.setImagen(productoRequest.getImagen());
        productoExistente.setStock(productoRequest.getStock());
        productoExistente.setCategoria(categoria);

        Producto productoActualizado = productoRepository.save(productoExistente);
        return mapProductoToProductoResponseDTO(productoActualizado);
    }

    @Override
    @Transactional
    public void eliminarProducto(Long id) {
        Producto producto = findProductoByIdOrElseThrow(id);

        if (!producto.getActivo()) {
            throw new BadRequestException("El producto ya está inactivo.");
        }
        producto.setActivo(false);

        // esto ejecuta un UPDATE, no un DELETE
        productoRepository.save(producto);
        logger.info("Producto con ID: {} marcado como inactivo.", id);
    }

    @Override
    @Transactional
    public void eliminarFisicamenteProducto(Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));

        productoRepository.delete(producto); // Elimina físicamente el producto
        logger.info("Producto con ID: {} eliminado físicamente.", id);
    }

    // Reactiva un producto marcado como inactivo
    @Override
    @Transactional
    public ProductoResponseDTO reactivarProducto(Long id) {

        Producto producto = findProductoByIdOrElseThrow(id);

        if (producto.getActivo()) {
            logger.warn("Intento de reactivar producto ya activo con ID: {}", id);
            return mapProductoToProductoResponseDTO(producto);
        }

        producto.setActivo(true);

        Producto productoReactivado = productoRepository.save(producto);
        logger.info("Producto con ID: {} reactivado correctamente.", id);

        return mapProductoToProductoResponseDTO(productoReactivado);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoResponseDTO obtenerProductoPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .filter(Producto::getActivo) // Filtra si no esta activo
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
        return mapProductoToProductoResponseDTO(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> listarTodosLosProductos() {
        return productoRepository.findAll()
                .stream()
                .filter(Producto::getActivo)
                .map(this::mapProductoToProductoResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .filter(Producto::getActivo)
                .map(this::mapProductoToProductoResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> buscarPorCategoria(Long categoriaId) {
        if (!categoriaRepository.existsById(categoriaId)) {
            throw new ResourceNotFoundException("Categoria", "id", categoriaId);

        }
        return productoRepository.findByCategoriaId(categoriaId)
                .stream()
                .filter(Producto::getActivo)
                .map(this::mapProductoToProductoResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> buscarPorRangoDePrecio(Double min, Double max) {
        if (min == null || max == null || min > max) {
            throw new BadRequestException("Rango de precios inválido.");
        }
        return productoRepository.findByPrecioBetween(min, max)
                .stream()
                .filter(Producto::getActivo)
                .map(this::mapProductoToProductoResponseDTO)
                .collect(Collectors.toList());
    }


    // Metodos privado
    private Producto findProductoByIdOrElseThrow(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
    }

    private Categoria findCategoriaByIdOrElseThrow(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
    }

    // Mapeador (visibilidad de paquete)
    ProductoResponseDTO mapProductoToProductoResponseDTO(Producto producto) {
        if (producto == null) return null;
        return ProductoResponseDTO.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .imagen(producto.getImagen())
                .stock(producto.getStock())
                .activo(producto.getActivo())
                .categoria(categoriaServiceMapperDelegate.mapCategoriaToCategoriaResponseDTO(producto.getCategoria()))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> listarTodosLosProductosParaAdmin() {
        // Llama al repositorio para obtener TODOS los productos de la base de datos
        return productoRepository.findAll()
                .stream()
                // ---- IMPORTANTE: NO hay .filter(Producto::getActivo) aquí ----
                // Mapea cada Producto (entidad) a ProductoResponseDTO (transferencia)
                .map(this::mapProductoToProductoResponseDTO) // Reutiliza tu mapeador existente
                // Colecciona los resultados en una Lista
                .collect(Collectors.toList());
    }
    // --- AÑADE ESTA IMPLEMENTACIÓN ---
    @Override
    @Transactional(readOnly = true)
    public ProductoResponseDTO obtenerProductoPorIdAdmin(Long id) {
        // Usa el método privado que busca sin importar el estado
        Producto producto = findProductoByIdOrElseThrow(id);
        // Mapea a DTO (que ya incluye el campo 'activo')
        return mapProductoToProductoResponseDTO(producto);
    }
}
