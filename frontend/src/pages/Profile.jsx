import { useState } from "react";
import { useUserData } from "../hooks/useUserData";
import { EditProfileForm } from "../components/EditProfileForm";

export const Profile = () => {
  const { user, error, isLoading, refetchUserData } = useUserData(); 
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = () => {
    refetchUserData(); 
    setIsEditing(false); 
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {!isEditing ? (
        <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
          <p><strong>Nombre:</strong> {user.nombres}</p>
          <p><strong>Apellidos:</strong> {user.apellidos}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nombre de Usuario:</strong> {user.nombreUsuario}</p>
          <p><strong>Contacto:</strong> {user.contacto}</p>
          <p><strong>Dirección:</strong> {user.direccion}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Editar Perfil
          </button>
        </div>
      ) : (
        <EditProfileForm user={user} onClose={handleProfileUpdate} />
      )}
    </>
  );
};