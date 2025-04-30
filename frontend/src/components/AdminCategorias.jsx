import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { CategoriaForm } from "./CategoriaForm";
import { listarCategorias } from "../api/categorias";

export const AdminCategorias = () => {
  const { items, crear, actualizar, eliminar } = useCrud("/admin/categorias", {
    listar: listarCategorias, // Usa la función personalizada para listar
  });
  const [selectedCategoria, setSelectedCategoria] = useState(null); // Categoría seleccionada
  const [isFormVisible, setIsFormVisible] = useState(false); // Controla si el formulario está visible

  const handleSave = async (categoria) => {
    if (categoria.id) {
      await actualizar(categoria.id, categoria); // Actualiza la categoría existente
    } else {
      await crear(categoria); // Crea una nueva categoría
    }
    setSelectedCategoria(null); // Limpia la categoría seleccionada
    setIsFormVisible(false); // Oculta el formulario
  };

  const handleCreate = () => {
    setSelectedCategoria({}); // Categoría vacía para crear
    setIsFormVisible(true); // Muestra el formulario
  };

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria); // Establece la categoría seleccionada
    setIsFormVisible(true); // Muestra el formulario
    
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Categorías</h2>
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear Categoría
      </button>
      {isFormVisible && (
        <CategoriaForm
          categoriaInicial={selectedCategoria}
          onSave={handleSave}
          onClose={() => setIsFormVisible(false)} // Oculta el formulario
        />
      )}
      <ul>
        {items.map((categoria) => (
          <li key={categoria.id} className="flex justify-between items-center mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg px-4">
            <span className="p-4 cursor-pointer">{categoria.nombre}</span>
            <div>
              <button
                onClick={() => handleEdit(categoria)}
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
 
    </div>
  );
};