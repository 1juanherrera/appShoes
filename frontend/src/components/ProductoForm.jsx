import { useState, useEffect } from "react";
import { useCategorias } from "../hooks/usecategorias"; // Importar el hook de categorías

export const ProductoForm = ({ productoInicial, onSave, onClose }) => {
  const [producto, setProducto] = useState(productoInicial || {});
  const { categorias, loading, error } = useCategorias(); // Usar el hook para obtener categorías

  useEffect(() => {
    setProducto(productoInicial || {});
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(producto);
  };

  return (
    <div className="bg-white p-4 rounded border shadow-md mb-4">
      <h3 className="text-lg font-bold mb-4">
        {producto.id ? "Editar Producto" : "Crear Producto"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre || ""}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={producto.descripcion || ""}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio || ""}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={producto.stock || ""}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imagen (URL)</label>
          <input
            type="text"
            name="imagen"
            value={producto.imagen || ""}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categoría</label>
          {loading ? (
            <p>Cargando categorías...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <select
              name="categoriaId"
              value={producto.categoriaId || ""}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border-2 border-gray-200 bg-gray-100"
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};