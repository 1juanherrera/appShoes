package com.api.appshoes.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.appshoes.exception.BadRequestException;
import com.api.appshoes.exception.ResourceNotFoundException;
import com.api.appshoes.model.dto.request.OrdenStatusUpdateRequestDTO;
import com.api.appshoes.model.dto.response.DetalleOrdenResponseDTO;
import com.api.appshoes.model.dto.response.OrdenResponseDTO;
import com.api.appshoes.model.dto.response.UsuarioResponseDTO;
import com.api.appshoes.model.entity.*;
import com.api.appshoes.model.enums.EstadoOrden;
import com.api.appshoes.repository.*;
import com.api.appshoes.service.CarritoService;
import com.api.appshoes.service.OrdenService;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrdenServiceImpl implements OrdenService {

    private final OrdenRepository ordenRepository;
    private final UsuarioRepository usuarioRepository;
    private final CarritoItemRepository carritoItemRepository;
    private final ProductoRepository productoRepository;
    private final CarritoService carritoService;
    private final ProductoServiceImpl productoServiceMapperDelegate;

    // Definicion de transiciones de estado validas
    private static final Map<EstadoOrden, Set<EstadoOrden>> transicionesValidas; // Key: Estado Actual, Value: Set de Estados Siguientes Permitidos

    static {
        Map<EstadoOrden, Set<EstadoOrden>> transitions = new HashMap<>();
        // Desde PENDIENTE se puede pasar a ENVIADO o CANCELADO
        transitions.put(EstadoOrden.PENDIENTE, Set.of(EstadoOrden.ENVIADO, EstadoOrden.CANCELADO));
        // Desde ENVIADO se puede pasar a ENTREGADO o CANCELADO (ajusta si no se puede cancelar tras envio)
        transitions.put(EstadoOrden.ENVIADO, Set.of(EstadoOrden.ENTREGADO, EstadoOrden.CANCELADO));
        // Desde ENTREGADO o CANCELADO no se permiten más cambios
        transitions.put(EstadoOrden.ENTREGADO, Collections.emptySet());
        transitions.put(EstadoOrden.CANCELADO, Collections.emptySet());

        transicionesValidas = Collections.unmodifiableMap(transitions); // mapa inmutable una vez inicializado
    }

    @Override
    @Transactional
    public OrdenResponseDTO crearOrdenDesdeCarrito(Long usuarioId) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        List<CarritoItem> itemsCarrito = carritoItemRepository.findByUsuario(usuario);

        if (itemsCarrito.isEmpty()) {
            throw new BadRequestException("El carrito está vacío, no se puede crear la orden.");
        }

        Double totalOrden = 0.0;
        List<DetalleOrden> detallesParaGuardar = new ArrayList<>();

        for (CarritoItem item : itemsCarrito) {
            // Asegurarse de que el producto no sea nulo
            Producto producto = Optional.ofNullable(item.getProducto())
                    .orElseThrow(() -> new BadRequestException("Item del carrito inválido, producto nulo para item ID: " + item.getId()));

            int cantidadSolicitada = item.getCantidad();

            if (producto.getStock() < cantidadSolicitada) {
                throw new BadRequestException("Stock insuficiente para el producto: " + producto.getNombre() +
                        ". Stock disponible: " + producto.getStock() + ", solicitado: " + cantidadSolicitada);
            }

            Double subtotalItem = producto.getPrecio() * cantidadSolicitada;
            totalOrden = totalOrden + subtotalItem;

            DetalleOrden detalle = DetalleOrden.builder()
                    .producto(producto)
                    .cantidad(cantidadSolicitada)
                    .precio(producto.getPrecio())
                    .build();
            detallesParaGuardar.add(detalle);
        }

        Orden nuevaOrden = Orden.builder()
                .usuario(usuario)
                .total(totalOrden)
                .estado(EstadoOrden.PENDIENTE)
                .build();

        detallesParaGuardar.forEach(nuevaOrden::addDetalle);
        Orden ordenGuardada = ordenRepository.save(nuevaOrden);

        for (DetalleOrden detalle : ordenGuardada.getDetalles()) {
            Producto producto = detalle.getProducto();
            int stockActual = producto.getStock();
            int cantidadComprada = detalle.getCantidad();
            producto.setStock(stockActual - cantidadComprada);
            productoRepository.save(producto);
        }

        carritoService.limpiarCarrito(usuarioId);

        return mapOrdenToOrdenResponseDTO(ordenGuardada);
    }

    @Override
    @Transactional(readOnly = true)
    public OrdenResponseDTO obtenerOrdenPorId(Long id) {
        Orden orden = findOrdenByIdOrElseThrow(id);
        return mapOrdenToOrdenResponseDTO(orden);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrdenResponseDTO> listarOrdenesPorUsuario(Long usuarioId) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        return ordenRepository.findByUsuarioOrderByFechaDesc(usuario)
                .stream()
                .map(this::mapOrdenToOrdenResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrdenResponseDTO> listarTodasLasOrdenes() {
        return ordenRepository.findAllWithUsuario()
                .stream()
                .map(this::mapOrdenToOrdenResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrdenResponseDTO actualizarEstadoOrden(Long id, OrdenStatusUpdateRequestDTO statusUpdateRequest) {
        Orden orden = findOrdenByIdOrElseThrow(id);
        EstadoOrden estadoActual = orden.getEstado();
        EstadoOrden estadoNuevo = statusUpdateRequest.getEstado();

        // 1. Si el estado nuevo es el mismo que el actual
        if (estadoActual == estadoNuevo) {
            return mapOrdenToOrdenResponseDTO(orden); // devuelve el estado actual
        }

        // 2. Validando la transicion
        Set<EstadoOrden> estadosPermitidos = transicionesValidas.getOrDefault(estadoActual, Collections.emptySet());

        if (!estadosPermitidos.contains(estadoNuevo)) {
            // Si el nuevo estado no esta en el conjunto de estados permitidos para el estado actual, lanza la excepcion
            throw new BadRequestException(String.format("Transición de estado inválida de '%s' a '%s' para la orden ID %d.", estadoActual, estadoNuevo, id));
        }

        // 3. Si la transición es valida
        orden.setEstado(estadoNuevo);
        Orden ordenActualizada = ordenRepository.save(orden);

        return mapOrdenToOrdenResponseDTO(ordenActualizada); // 4. Orden actualizada
    }


    // Metodos privados

    private Usuario findUsuarioByIdOrElseThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
    }

    private Orden findOrdenByIdOrElseThrow(Long id) {
        // fetch EAGER para detalles o asegurar carga si es LAZY
        return ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden", "id", id));
    }

    private OrdenResponseDTO mapOrdenToOrdenResponseDTO(Orden orden) {
        if (orden == null) return null;
        List<DetalleOrdenResponseDTO> detallesDTO = orden.getDetalles().stream()
                .map(this::mapDetalleOrdenToResponseDTO)
                .collect(Collectors.toList());

        UsuarioResponseDTO usuarioDTO = null;
            if (orden.getUsuario() != null) {
                usuarioDTO = UsuarioResponseDTO.builder()
                        .id(orden.getUsuario().getId())
                        .nombres(orden.getUsuario().getNombres())
                        .apellidos(orden.getUsuario().getApellidos())
                        .email(orden.getUsuario().getEmail())
                        .build();
                    }

        return OrdenResponseDTO.builder()
                .id(orden.getId())
                .total(orden.getTotal())
                .estado(orden.getEstado())
                .fecha(orden.getFecha())
                .usuario(usuarioDTO) // Check null usuario
                .detalles(detallesDTO)
                .build();
    }

    private DetalleOrdenResponseDTO mapDetalleOrdenToResponseDTO(DetalleOrden detalle) {
        if (detalle == null) return null;
        return DetalleOrdenResponseDTO.builder()
                .id(detalle.getId())
                .cantidad(detalle.getCantidad())
                .precio(detalle.getPrecio())
                .producto(productoServiceMapperDelegate.mapProductoToProductoResponseDTO(detalle.getProducto()))
                .build();
    }
}
