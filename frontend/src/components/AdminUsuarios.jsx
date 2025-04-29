import { useState } from "react";
import { useCrud } from "../hooks/useCrud";

export const AdminUsuarios = () => {
  const { items, actualizar, eliminar, loading, error } = useCrud("/admin/usuarios");
  const [editingUser, setEditingUser] = useState(null);

  const handleUpdate = async () => {
    if (!editingUser) return;
    await actualizar(editingUser.id, editingUser);
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Usuarios</h2>
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul>
        {items.map((usuario) => (
          <li key={usuario.id} className="flex justify-between items-center border p-4 mb-2">
            <div>
              <p className="font-semibold">{usuario.nombres} {usuario.apellidos}</p>
              <p className="text-sm text-gray-500">{usuario.email} ({usuario.rol})</p>
            </div>
            <div>
              <button
                onClick={() => setEditingUser(usuario)}
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

      {editingUser && (
        <div className="bg-white border p-4 mt-6 rounded">
          <h3 className="font-bold mb-2">Editar Usuario</h3>
          <input
            className="border p-2 w-full mb-2"
            value={editingUser.nombres}
            onChange={(e) => setEditingUser({ ...editingUser, nombres: e.target.value })}
            placeholder="Nombres"
          />
          <input
            className="border p-2 w-full mb-2"
            value={editingUser.apellidos}
            onChange={(e) => setEditingUser({ ...editingUser, apellidos: e.target.value })}
            placeholder="Apellidos"
          />
          <select
            className="border p-2 w-full mb-2"
            value={editingUser.rol}
            onChange={(e) => setEditingUser({ ...editingUser, rol: e.target.value })}
          >
            <option value="USUARIO">Usuario</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
            onClick={handleUpdate}
          >
            Guardar
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-1 rounded"
            onClick={() => setEditingUser(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
