import { useState } from "react";

export const UsuarioForm = ({ usuarioInicial, onSave, onClose }) => {
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.nombreUsuario || usuario.nombreUsuario.trim() === "") {
      setError("El nombre de usuario es obligatorio.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSave(usuario);
      setLoading(false);
    } catch (err) {
      setError("Ocurrió un error al guardar el usuario.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {usuario.id ? "Editar Usuario" : "Crear Usuario"}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={usuario.nombres || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={usuario.apellidos || ""}
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
      <input
        type="text"
        name="nombreUsuario"
        placeholder="Nombre de Usuario"
        value={usuario.nombreUsuario || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="contacto"
        placeholder="Contacto"
        value={usuario.contacto || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={usuario.direccion || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={usuario.contrasena || ""}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
        disabled={loading}
      >
        Cancelar
      </button>
    </form>
  );
};