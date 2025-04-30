import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { ProductoForm } from "./ProductoForm";

export const AdminProductos = () => {
  const { items, crear, actualizar, eliminar, error, loading } = useCrud("/admin/productos");
  const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado
  const [isFormVisible, setIsFormVisible] = useState(false); // Controla si el formulario está visible

  const handleSave = async (producto) => {
    if (producto.id) {
      await actualizar(producto.id, producto); // Actualiza el producto existente
    } else {
      await crear(producto); // Crea un nuevo producto
    }
    setSelectedProducto(null); // Limpia el producto seleccionado
    setIsFormVisible(false); // Oculta el formulario
  };

  const handleCreate = () => {
    setSelectedProducto({}); // Producto vacío para crear
    setIsFormVisible(true); // Muestra el formulario
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto); // Establece el producto seleccionado
    setIsFormVisible(true); // Muestra el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        Crear Producto
      </button>
      {isFormVisible && (
        <ProductoForm
          productoInicial={selectedProducto}
          onSave={handleSave}
          onClose={() => setIsFormVisible(false)} // Oculta el formulario
        />
      )}
      <ul>
        {items.map((producto) => (
          <li key={producto.id} className="flex justify-between items-center mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg px-4">
            <span className="p-4">{producto.nombre}</span>
            <div>
              <button
                onClick={() => handleEdit(producto)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(producto.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};