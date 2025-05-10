package com.api.appshoes.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.appshoes.exception.BadRequestException;
import com.api.appshoes.exception.ResourceNotFoundException;
import com.api.appshoes.model.dto.request.CarritoAddItemRequestDTO;
import com.api.appshoes.model.dto.request.CarritoUpdateItemRequestDTO;
import com.api.appshoes.model.dto.response.CarritoItemResponseDTO;
import com.api.appshoes.model.dto.response.CarritoResponseDTO;
import com.api.appshoes.model.entity.CarritoItem;
import com.api.appshoes.model.entity.Producto;
import com.api.appshoes.model.entity.Usuario;
import com.api.appshoes.repository.CarritoItemRepository;
import com.api.appshoes.repository.ProductoRepository;
import com.api.appshoes.repository.UsuarioRepository;
import com.api.appshoes.service.CarritoService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarritoServiceImpl implements CarritoService {
    private final CarritoItemRepository carritoItemRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    private final ProductoServiceImpl productoServiceMapperDelegate;

    @Override
    @Transactional
    public CarritoResponseDTO agregarItemAlCarrito(Long usuarioId, CarritoAddItemRequestDTO itemRequest) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        Producto producto = findProductoByIdOrElseThrow(itemRequest.getProductoId());

        if (producto.getStock() < itemRequest.getCantidad()) {
            throw new BadRequestException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        Optional<CarritoItem> itemExistenteOpt = carritoItemRepository.findByUsuarioAndProducto(usuario, producto);

        if (itemExistenteOpt.isPresent()) {
            CarritoItem itemExistente = itemExistenteOpt.get();
            int nuevaCantidad = itemExistente.getCantidad() + itemRequest.getCantidad();
            if (producto.getStock() < nuevaCantidad) {
                throw new BadRequestException("Stock insuficiente para la cantidad total solicitada de: " + producto.getNombre());
            }
            itemExistente.setCantidad(nuevaCantidad);
            carritoItemRepository.save(itemExistente);
        } else {
            CarritoItem nuevoItem = CarritoItem.builder()
                    .usuario(usuario)
                    .producto(producto)
                    .cantidad(itemRequest.getCantidad())
                    .build();
            carritoItemRepository.save(nuevoItem);
        }

        return obtenerCarritoDelUsuario(usuarioId);
    }

    @Override
    @Transactional
    public CarritoResponseDTO actualizarCantidadItem(Long usuarioId, Long productoId, CarritoUpdateItemRequestDTO updateRequest) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        Producto producto = findProductoByIdOrElseThrow(productoId);

        CarritoItem item = carritoItemRepository.findByUsuarioAndProducto(usuario, producto)
                .orElseThrow(() -> new ResourceNotFoundException("Item del carrito no encontrado para el usuario y producto dados"));

        if (producto.getStock() < updateRequest.getCantidad()) {
            throw new BadRequestException("Stock insuficiente para la cantidad solicitada de: " + producto.getNombre());
        }
        // Cantidad no sea cero o negativa si se actualiza
        if (updateRequest.getCantidad() <= 0) {
            throw new BadRequestException("La cantidad debe ser mayor que cero.");
        }

        item.setCantidad(updateRequest.getCantidad());
        carritoItemRepository.save(item);

        return obtenerCarritoDelUsuario(usuarioId);
    }

    @Override
    @Transactional
    public CarritoResponseDTO eliminarItemDelCarrito(Long usuarioId, Long productoId) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        Producto producto = findProductoByIdOrElseThrow(productoId);

        carritoItemRepository.findByUsuarioAndProducto(usuario, producto)
                .ifPresentOrElse(
                        carritoItemRepository::delete,
                        () -> { throw new ResourceNotFoundException("Item del carrito no encontrado"); }
                );

        return obtenerCarritoDelUsuario(usuarioId);
    }

    @Override
    @Transactional(readOnly = true)
    public CarritoResponseDTO obtenerCarritoDelUsuario(Long usuarioId) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        List<CarritoItem> items = carritoItemRepository.findByUsuario(usuario);

        List<CarritoItemResponseDTO> itemDTOs = items.stream()
                .map(this::mapCarritoItemToResponseDTO)
                .collect(Collectors.toList());

        Double total = calcularTotalCarrito(itemDTOs);

        return CarritoResponseDTO.builder()
                .items(itemDTOs)
                .total(total)
                .build();
    }

    @Override
    @Transactional
    public void limpiarCarrito(Long usuarioId) {
        Usuario usuario = findUsuarioByIdOrElseThrow(usuarioId);
        carritoItemRepository.deleteByUsuario(usuario);
    }


    // Metodos privado
    private Usuario findUsuarioByIdOrElseThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
    }

    private Producto findProductoByIdOrElseThrow(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
    }

    private CarritoItemResponseDTO mapCarritoItemToResponseDTO(CarritoItem item) {
        if (item == null) return null;
        return CarritoItemResponseDTO.builder()
                .id(item.getId())
                .cantidad(item.getCantidad())
                .producto(productoServiceMapperDelegate.mapProductoToProductoResponseDTO(item.getProducto()))
                .build();
    }

    private Double calcularTotalCarrito(List<CarritoItemResponseDTO> items) {
        if (items == null) return 0.0;
        return items.stream()
                .filter(item -> item.getProducto() != null && item.getProducto().getPrecio() != null && item.getCantidad() != null)
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
    }
}
