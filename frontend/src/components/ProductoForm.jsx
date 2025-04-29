import { useState } from "react";

export const ProductoForm = ({ productoInicial, onSave, onClose }) => {
  const [producto, setProducto] = useState(productoInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {producto.id ? "Editar Producto" : "Crear Producto"}
      </h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
      >
        Cancelar
      </button>
    </form>
  );
};