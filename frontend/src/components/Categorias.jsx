import { useCategorias } from "../hooks/usecategorias";

export const Categorias = () => {

  const { categorias, loading, error, handleCategoriaClick } = useCategorias(); 


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center pb-20 text-blue-800 list-categorias">Lista de Categorías</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between hover:shadow-lg transition-shadow"
          >
            <p className="text-lg font-semibold text-gray-800">{categoria.nombre}</p>
            <button
              onClick={() => handleCategoriaClick(categoria.id)} // Llama a la función para redirigir
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Productos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};