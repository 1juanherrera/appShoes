import { useState } from "react";

export const CategoriaForm = ({ categoriaInicial, onSave, onClose }) => {
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoria.nombre || categoria.nombre.trim() === "") {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }
    setError(null); 
    setLoading(true); 
    try {
      await onSave(categoria); 
      setLoading(false); 
    } catch (err) {
      setError("Ocurrió un error al guardar la categoría.");
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border shadow-md rounded mb-4">
      <h2 className="text-xl font-bold mb-4">
        {categoria.id ? "Editar Categoría" : "Crear Categoría"}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>} {/* Muestra errores */}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre de la Categoría"
        value={categoria.nombre || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded border-2 border-gray-200 bg-gray-100"
      />
      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Desactiva el botón mientras se procesa
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
        disabled={loading} // Desactiva el botón mientras se procesa
      >
        Cancelar
      </button>
    </form>
  );
};