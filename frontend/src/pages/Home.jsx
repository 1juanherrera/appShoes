import { ListaProductos } from "../components/ListaProductos";
import { useGetUsersData } from "../hooks/useGetusersData";

export const Home = () => {

   const { user } = useGetUsersData();

   if (!user) {
    // Muestra un mensaje de carga mientras los datos del usuario se obtienen
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-extrabold mb-4">¡Bienvenido {user.nombres}!</h1>
      <ListaProductos />
    </div>
  );
}

