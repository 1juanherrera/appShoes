import { useState } from "react";
import { useUserData } from "../hooks/useUserData";

export const EditProfileForm = ({ user, onClose }) => {
  const { updateUser } = useUserData();
  const [formData, setFormData] = useState({
    nombres: user.nombres || "",
    apellidos: user.apellidos || "",
    email: user.email || "",
    nombreUsuario: user.nombreUsuario || "",
    contacto: user.contacto || "",
    direccion: user.direccion || "",
    contrasena: "", // Inicializa la contraseña como vacía
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = { ...formData };
    if (!formData.contrasena) {
      delete dataToSend.contrasena; // Elimina la contraseña si está vacía
    }
  
    const updatedUser = await updateUser(dataToSend); // Supón que `updateUser` devuelve los datos actualizados
    alert("Perfil actualizado con éxito.");
    onClose(updatedUser); // Devuelve los datos actualizados al componente padre
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 flex-col separador">
      <h2 className="text-3xl font-bold text-center text-gray-800">Editar Perfil</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mt-0">
        <form autoComplete="off" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              autoComplete="given-name"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              autoComplete="family-name"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contacto</label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              required
              autoComplete="tel"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              autoComplete="address"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Dejar en blanco para no cambiar"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-2 py-2 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};