export const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "bg-yellow-500";
      case "ENVIADO":
        return "bg-blue-500"; 
      case "ENTREGADO":
        return "bg-green-500"; 
      case "CANCELADO":
        return "bg-red-500"; 
      default:
        return "bg-gray-500"; 
    }
  }