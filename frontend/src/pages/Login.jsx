import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

 export const Login = () => {

  const {   email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Iniciar Sesión</h2>
      <div className="w-full max-w-md space-y-4 bg-white shadow-lg rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mt-4">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 mt-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">¿No tienes una cuenta? 
        <Link to="/register" className="text-blue-800 hover:underline"> Regístrate</Link>
        </p>
      </div>
    </div>
  );
};