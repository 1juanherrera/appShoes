import { useGetUsersData } from "../hooks/useGetusersData";

export const Profile = () => {

  const { user, error } = useGetUsersData();
  

  if (error) {
    return <p className="text-red-500">{error}</p>; // Muestra un mensaje de error si ocurre
  }

  if (!user) {
    return <p>Cargando datos del usuario...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      <p>Bienvenido, {user.nombres} ({user.email})</p>
      <p>{user.contacto} {user.direccion} {user.nombreUsuario}</p>
      <p>{user.rol}</p>
      <p>Aquí puedes gestionar los usuarios.</p>
    </div>
  );
};
