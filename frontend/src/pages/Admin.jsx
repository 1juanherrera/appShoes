import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <div className="p-6 container">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <div className="flex space-x-4 pt-5 justify-between">
        {/* Enlace para administrar productos */}
        <Link to="/admin/productos">
          <div className="bg-blue-600 text-white px-4 m-3 py-2 rounded w-80 text-center">
            Administrar Productos
          </div>
        </Link>

        {/* Enlace para administrar categorías */}
        <Link to="/admin/categorias">
          <div className="bg-green-600 text-white px-4 m-3 py-2 rounded w-80 text-center">
            Administrar Categorías
          </div>
        </Link>

        {/* Enlace para administrar usuarios */}
        <Link to="/admin/usuarios">
          <div className="bg-yellow-600 text-white px-4 m-3 py-2 rounded w-80 text-center">
            Administrar Usuarios
          </div>
        </Link>
      </div>
    </div>
  );
};