package com.api.appshoes.service;

import java.util.List;

import com.api.appshoes.model.dto.request.OrdenStatusUpdateRequestDTO;
import com.api.appshoes.model.dto.response.OrdenResponseDTO;

public interface OrdenService {

    OrdenResponseDTO crearOrdenDesdeCarrito(Long usuarioId);

    OrdenResponseDTO obtenerOrdenPorId(Long id);

    List<OrdenResponseDTO> listarOrdenesPorUsuario(Long usuarioId);

    List<OrdenResponseDTO> listarTodasLasOrdenes(); // Admin

    OrdenResponseDTO actualizarEstadoOrden(Long id, OrdenStatusUpdateRequestDTO statusUpdateRequest); // Admin
}
