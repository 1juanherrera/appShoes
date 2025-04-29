import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import { Modal } from "../components/Modal";

export const AdminUsuarios = ({ onClose }) => {
  const { items, crear, actualizar, eliminar } = useCrud("/usuarios");
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const handleSave = async (usuario) => {
    if (usuario.id) {
      await actualizar(usuario.id, usuario);
    } else {
      await crear(usuario);
    }
    setSelectedUsuario(null);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Administrar Usuarios</h2>
      <button
        onClick={() => setSelectedUsuario({})}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear Usuario
      </button>
      <ul>
        {items.map((usuario) => (
          <li key={usuario.id} className="flex justify-between items-center mb-2">
            <span>{usuario.nombre}</span>
            <div>
              <button
                onClick={() => setSelectedUsuario(usuario)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(usuario.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedUsuario && (
        <UsuarioForm
          usuarioInicial={selectedUsuario}
          onSave={handleSave}
          onClose={() => setSelectedUsuario(null)}
        />
      )}
    </Modal>
  );
};

const UsuarioForm = ({ usuarioInicial, onSave, onClose }) => {
  const [usuario, setUsuario] = useState(usuarioInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(usuario);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {usuario.id ? "Editar Usuario" : "Crear Usuario"}
      </h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={usuario.nombre || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={usuario.email || ""}
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