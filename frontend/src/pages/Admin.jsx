import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
        {/* Enlace para administrar productos */}
        <Link to="/admin/productos" className="text-decoration-none">
          <div className="bg-blue-600 text-white px-4 m-3 py-2 rounded w-full text-center">
            Administrar Productos
          </div>
        </Link>

        {/* Enlace para administrar categorías */}
        <Link to="/admin/categorias" className="text-decoration-none">
          <div className="bg-green-600 text-white px-4 m-3 py-2 rounded w-full text-center">
            Administrar Categorías
          </div>
        </Link>

        {/* Enlace para administrar usuarios */}
        <Link to="/admin/usuarios" className="text-decoration-none">
          <div className="bg-yellow-600 text-white px-4 m-3 py-2 rounded w-full text-center">
            Administrar Usuarios
          </div>
        </Link>

        {/* Enlace para administrar órdenes */}
        <Link to="/admin/ordenes" className="text-decoration-none">
          <div className="bg-indigo-600 text-white px-4 m-3 py-2 rounded w-full text-center">
            Administrar Ordenes
          </div>
        </Link>
      </div>
    </div>
  );
};