import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Logout from "./Logout";
import { FiShoppingBag } from "react-icons/fi";
import { useUserData } from "../hooks/useUserData";
import logo  from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta

export const Navbar = () => {

  const { user, isAdmin } = useUserData();


  if (!user) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <nav className="bg-blue-800 p-4 text-white flex items-center mb-5">
      <div className="flex items-center justify-between w-full">
        <img className="w-40" src={logo} alt="logo" />
        <ul className="space-x-4 flex flex-wrap m-5 justify-around w-6/12">
          <li>
            <Link to="/home" className="hover:underline text-white cursor-pointer flex justify-center items-center text-2xl">
              <FiHome />
              <span className="ml-2">Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/categorias" className="hover:underline text-white cursor-pointer flex justify-center items-center text-2xl">
              <BiCategoryAlt />
              <span className="ml-2">Categorías</span>
            </Link>
          </li>
          {isAdmin && ( // Verifica si isAdmin es true
            <li>
              <Link to="/admin" className="admin hover:underline cursor-pointer flex justify-center items-center text-2xl">
                <MdOutlineAdminPanelSettings />
                <span className="ml-2">Admin</span>
              </Link>
            </li>
          )}
          <li>
            <Link to="/ordenes" className="hover:underline text-white cursor-pointer flex justify-center items-center text-2xl">
              <FiShoppingBag />
              <span className="ml-2">Ordenes</span>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-end items-center w-xs text-3xl">
          <li>
            <p className="text-lg m-0 mr-2">{user.nombres}</p>
            </li>
          <li className="cursor-pointer pr-4">
            <Link to="/profile" className="hover:underline text-white cursor-pointer">
              <CgProfile />
            </Link>
          </li>
          <li className="pr-4">
            <Link to="/carrito" className="hover:underline text-white cursor-pointer">
              <RiShoppingCartLine />
            </Link>
          </li>
          <li className="hover:underline p-0 cursor-pointer text-red-700">
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
};