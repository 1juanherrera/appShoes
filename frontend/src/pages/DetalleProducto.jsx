import { useParams } from "react-router-dom";

export const DetalleProducto = ({ productos = [] }) => {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const producto = productos.find((p) => p.id_prod === parseInt(id)); // Cambia a id_prod

  if (!producto) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h2 className="text-2xl font-bold text-red-600">Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-96 object-cover mb-4"
      />
      <p className="text-lg mb-4">{producto.descripcion}</p>
      <p className="text-xl font-bold text-green-700 mb-4">Precio: ${producto.precio}</p>
      <p className="text-md font-medium text-blue-700">
        Estado: {producto.activo ? "Activo" : "No activo"}
      </p>
      <p className="text-md font-medium">
        Stock:{" "}
        <span
          className={`font-bold ${
            producto.stock > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {producto.stock > 0 ? `${producto.stock} disponibles` : "No disponible"}
        </span>
      </p>
    </div>
  );
};