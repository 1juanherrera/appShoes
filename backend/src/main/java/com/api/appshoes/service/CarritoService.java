package com.api.appshoes.service;

import com.api.appshoes.model.dto.request.CarritoAddItemRequestDTO;
import com.api.appshoes.model.dto.request.CarritoUpdateItemRequestDTO;
import com.api.appshoes.model.dto.response.CarritoResponseDTO;

public interface CarritoService {

    CarritoResponseDTO agregarItemAlCarrito(Long usuarioId, CarritoAddItemRequestDTO itemRequest);

    CarritoResponseDTO actualizarCantidadItem(Long usuarioId, Long productoId, CarritoUpdateItemRequestDTO updateRequest);

    CarritoResponseDTO eliminarItemDelCarrito(Long usuarioId, Long productoId);

    CarritoResponseDTO obtenerCarritoDelUsuario(Long usuarioId);

    void limpiarCarrito(Long usuarioId);
}
