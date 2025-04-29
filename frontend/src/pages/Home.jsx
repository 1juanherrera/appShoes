import { Producto } from "../components/Producto";

export const Home = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-extrabold mb-5">¡Bienvenido a appShoes!</h1>
      <Producto />
    </div>
  );
}

