import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { UsuarioAdminList } from "./UsuarioAdminList";

export const AdminUsuarios = () => {
  const { items, crear, actualizar, eliminar, error, loading } = useCrud("/admin/usuarios");
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSave = async (usuario) => {
    if (usuario.id) {
      await actualizar(usuario.id, usuario);
    } else {
      await crear(usuario);
    }
    setSelectedUsuario(null);
    setIsFormVisible(false);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setIsFormVisible(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Usuarios</h2>
      {error && <p className="text-red-600">{error}</p>}
      {isFormVisible && (
        <UsuarioAdminList
          usuarioInicial={selectedUsuario}
          onSave={handleSave}
          onClose={() => setIsFormVisible(false)}
        />
      )}
      <ul>
        {items.map((usuario) => (
          <li key={usuario.id} className="flex justify-between items-center border p-4 mb-2 bg-gray-100 rounded-lg">
            <div>
              <p className="font-semibold">{usuario.nombres} {usuario.apellidos}</p>
              <p className="text-sm text-gray-600">{usuario.email} ({usuario.rol})</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(usuario)}
                className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(usuario.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
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
