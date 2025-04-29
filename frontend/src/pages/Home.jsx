import { ListaProductos } from "../components/ListaProductos";

export const Home = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-extrabold mb-5">¡Tus zapatos ideales te esperan en appShoes!</h1>
      <ListaProductos />
    </div>
  );
}

