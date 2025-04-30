import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../auth/authService";

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    nombreUsuario: "",
    contacto: "",
    direccion: "",
    contrasena: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const response = await registrarUsuario(formData);
      console.log("Respuesta del backend:", response.token);

      // Guardar el token en localStorage
      localStorage.setItem("token", response.token);

      setMensaje("Usuario registrado exitosamente.");
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        nombreUsuario: "",
        contacto: "",
        direccion: "",
        contrasena: "",
      });

      // Redirigir al usuario al home
      navigate("/home");
    } catch (err) {
      console.error("Error en el registro:", err);
      setError(err.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registro de Usuario</h2>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <form autoComplete="off" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
          </div>
        </form>
        {mensaje && <p className="text-sm text-green-500 mt-4">{mensaje}</p>}
        {error && <p className="text-sm text-red-500 pl-4">{error}</p>}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-800 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};