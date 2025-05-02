export const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "bg-yellow-500"; // Amarillo
      case "ENVIADO":
        return "bg-blue-500"; // Azul
      case "ENTREGADO":
        return "bg-green-500"; // Verde
      case "CANCELADO":
        return "bg-red-500"; // Rojo
      default:
        return "bg-gray-500"; // Gris por defecto
    }
  }