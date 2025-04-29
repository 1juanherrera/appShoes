import { useProductos } from "../hooks/useProductos";
import { FaTrashAlt } from "react-icons/fa";

export const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useProductos();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Tu Carrito</h1>
      <div className="mt-10 text-center">
            <button
              onClick={vaciarCarrito}
              className="bg-red-600 fixed bottom-10 right-5 text-white rounded-lg hover:bg-red-700 transition-colors px-4 py-2 flex items-center"
            >
              <FaTrashAlt size={15} />
              <span className="ml-2">Vaciar Carrito</span>
            </button>
          </div>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {carrito.map((producto) => (
              <li
                key={producto.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full relative"
              >
                <h2 className="text-lg font-bold mt-4">{producto.nombre}</h2>
                         <img
                           src={producto.imagen}
                           alt={producto.nombre}
                           className="w-full h-50 object-cover mb-2"
                         />
                         <p>{producto.descripcion}</p>
                         
               
                         <div className="flex items-center justify-between mb-2">
                           <p className="m-0 text-blue-700 font-medium">{!producto.activo ? "No activo" : "Activo"}</p>
                           <div className="flex items-center">
                             <div className={`h-5 w-5 rounded-full ${producto.stock <= 0 ? "bg-red-700" : "bg-green-700"}`}></div>
                             <p className="m-0 p-2">{producto.stock <= 0 ? "No disponible" : "Disponible"}</p>
                           </div>
                         </div>
               
                         <div className="flex justify-between items-center">
                             <p className="text-green-700 font-bold text-4xl m-0">$ {producto.precio}</p>
                             <button
                               onClick={() => eliminarDelCarrito(producto.id)}
                               className="px-4 py-2 rounded-full text-red-600 hover:text-red-800"
                             >
                               <FaTrashAlt size={25} />
                             </button>
                         </div>
              </li>
            ))}
          </ul>
          
        </>
      )}
    </div>
  );
};
