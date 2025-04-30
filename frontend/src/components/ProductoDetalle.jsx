
export const ProductoDetalle = ({ producto, onClose }) => {
  if (!producto) {
    return <p>No hay detalles disponibles para este producto.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 flex">
      <div className="h-5/12">
        <div className="mb-4">
        <h3 className="text-lg font-bold mb-4">Detalles del Producto</h3>
            <label className="block text-gray-700 font-semibold">Nombre:</label>
            <p className="text-gray-800">{producto.nombre || "No especificado"}</p>
        </div>
        <div className="mb-4 w-11/12">
            <label className="block text-gray-700 font-semibold">Descripción:</label>
            <p className="text-gray-800">{producto.descripcion || "No especificado"}</p>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Precio:</label>
            <p className="text-gray-800">${producto.precio || "No especificado"}</p>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Stock:</label>
            <p className="text-gray-800">{producto.stock || "No especificado"}</p>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Categoría:</label>
            <p className="text-gray-800">{producto.categoriaNombre || "No especificada"}</p>
        </div>
        <div className="flex justify-start">
            <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            >
            Cerrar
            </button>
        </div>
      </div>
      <div className="mb-4 w-7/12 flex justify-center items-center">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-90 h-auto rounded"
          />
        ) : (
          <p className="text-gray-800">No especificada</p>
        )}
      </div>
    </div>
  );
};