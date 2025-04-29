import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { Modal } from "../components/Modal"
import { ProductoForm } from "./ProductoForm";

export const AdminProductos = ({ onClose }) => {
  const { items, crear, actualizar, eliminar } = useCrud("/productos");
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleSave = async (producto) => {
    if (producto.id) {
      await actualizar(producto.id, producto);
    } else {
      await crear(producto);
    }
    setSelectedProducto(null);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>
      <button
        onClick={() => setSelectedProducto({})}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear Producto
      </button>
      <ul>
        {items.map((producto) => (
          <li key={producto.id} className="flex justify-between items-center mb-2">
            <span>{producto.nombre}</span>
            <div>
              <button
                onClick={() => setSelectedProducto(producto)}
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
      {selectedProducto && (
        <ProductoForm
          productoInicial={selectedProducto}
          onSave={handleSave}
          onClose={() => setSelectedProducto(null)}
        />
      )}
    </Modal>
  );
};