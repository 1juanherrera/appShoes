package com.api.webapp.service;

import com.api.webapp.model.dto.request.OrdenStatusUpdateRequestDTO;
import com.api.webapp.model.dto.response.OrdenResponseDTO;

import java.util.List;

public interface OrdenService {

    OrdenResponseDTO crearOrdenDesdeCarrito(Long usuarioId);

    OrdenResponseDTO obtenerOrdenPorId(Long id);

    List<OrdenResponseDTO> listarOrdenesPorUsuario(Long usuarioId);

    List<OrdenResponseDTO> listarTodasLasOrdenes(); // Admin

    OrdenResponseDTO actualizarEstadoOrden(Long id, OrdenStatusUpdateRequestDTO statusUpdateRequest); // Admin
}
