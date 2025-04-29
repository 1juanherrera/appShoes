import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { Modal } from "../components/Modal"

export const AdminCategorias = ({ onClose }) => {
  const { items, crear, actualizar, eliminar } = useCrud("/categorias");
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const handleSave = async (categoria) => {
    if (categoria.id) {
      await actualizar(categoria.id, categoria);
    } else {
      await crear(categoria);
    }
    setSelectedCategoria(null);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Administrar Categorías</h2>
      <button
        onClick={() => setSelectedCategoria({})}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear Categoría
      </button>
      <ul>
        {items.map((categoria) => (
          <li key={categoria.id} className="flex justify-between items-center mb-2">
            <span>{categoria.nombre}</span>
            <div>
              <button
                onClick={() => setSelectedCategoria(categoria)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(categoria.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedCategoria && (
        <CategoriaForm
          categoriaInicial={selectedCategoria}
          onSave={handleSave}
          onClose={() => setSelectedCategoria(null)}
        />
      )}
    </Modal>
  );
};

const CategoriaForm = ({ categoriaInicial, onSave, onClose }) => {
  const [categoria, setCategoria] = useState(categoriaInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(categoria);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {categoria.id ? "Editar Categoría" : "Crear Categoría"}
      </h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre de la Categoría"
        value={categoria.nombre || ""}
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