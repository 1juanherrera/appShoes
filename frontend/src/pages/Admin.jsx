import React, { useState } from "react";
import { AdminProductos } from "../components/AdminProductos";

export const Admin = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6 container">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <div className="flex space-x-4 pt-5 justify-between">
        <button
          onClick={() => setActiveModal("productos")}
          className="bg-blue-600 text-white px-4 m-3 py-2 rounded w-4/12"
        >
          Administrar Productos
        </button>
        <button
          onClick={() => setActiveModal("categorias")}
          className="bg-green-600 text-white px-4 m-3 py-2 rounded w-4/12"
        >
          Administrar Categorías
        </button>
        <button
          onClick={() => setActiveModal("usuarios")}
          className="bg-yellow-600 text-white px-4 m-3 py-2 rounded w-4/12"
        >
          Administrar Usuarios
        </button>
      </div>

      {activeModal === "productos" && <AdminProductos onClose={closeModal} />}
      {activeModal === "categorias" && <CategoriaCrud onClose={closeModal} />}
      {activeModal === "usuarios" && <UsuarioCrud onClose={closeModal} />}
    </div>
  );
};