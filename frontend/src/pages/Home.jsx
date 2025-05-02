import { ListaProductos } from "../components/ListaProductos";
import { useUserData } from "../hooks/useUserData";

export const Home = () => {

   const { user } = useUserData();

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

