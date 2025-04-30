import { useState, useEffect } from "react";

export const UsuarioAdminList = ({ usuarioInicial, onSave, onClose }) => {
  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    nombreUsuario: "",
    contacto: "",
    direccion: "",
    rol: "USUARIO",
  });

  useEffect(() => {
    if (usuarioInicial) {
      setUsuario({
        nombres: usuarioInicial.nombres || "",
        apellidos: usuarioInicial.apellidos || "",
        email: usuarioInicial.email || "",
        nombreUsuario: usuarioInicial.nombreUsuario || "",
        contacto: usuarioInicial.contacto || "",
        direccion: usuarioInicial.direccion || "",
        rol: usuarioInicial.rol || "USUARIO",
        id: usuarioInicial.id, // Conserva el id si está presente
      });
    }
  }, [usuarioInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(usuario);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border p-4 mb-6 rounded shadow-md"
    >
      <h3 className="font-bold mb-4">
        {usuario.id ? "Editar Usuario" : "Crear Usuario"}
      </h3>

      <input
        name="nombres"
        value={usuario.nombres}
        onChange={handleChange}
        placeholder="Nombres"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="apellidos"
        value={usuario.apellidos}
        onChange={handleChange}
        placeholder="Apellidos"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="email"
        value={usuario.email}
        onChange={handleChange}
        placeholder="Correo"
        type="email"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="nombreUsuario"
        value={usuario.nombreUsuario}
        onChange={handleChange}
        placeholder="Nombre de usuario"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="contacto"
        value={usuario.contacto}
        onChange={handleChange}
        placeholder="Contacto"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        name="direccion"
        value={usuario.direccion}
        onChange={handleChange}
        placeholder="Dirección"
        className="border p-2 w-full mb-2"
        required
      />
      <select
        name="rol"
        value={usuario.rol}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      >
        <option value="USUARIO">Usuario</option>
        <option value="ADMINISTRADOR">Administrador</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-1 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
