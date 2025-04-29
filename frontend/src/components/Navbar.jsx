import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 text-white flex items-center mb-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          <Link to="/home" className="text-white">AppShoes</Link>
        </h1>
        <ul className="space-x-4 flex flex-wrap m-5 justify-around w-5/12">
          <li>
            <Link to="/home" className="hover:underline text-white cursor-pointer flex justify-center items-center text-3xl">
            <FiHome />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/categorias" className="hover:underline text-white cursor-pointer flex justify-center items-center text-3xl">
            <BiCategoryAlt />
              Categorias
            </Link>
          </li>
          <li>
            <Link to="/admin" className="admin hover:underline cursor-pointer flex justify-center items-center text-3xl">
            <MdOutlineAdminPanelSettings />
              Admin
            </Link>
          </li>
        </ul>
        <ul className="flex justify-end items-center w-xs text-3xl">
            <li className="cursor-pointer pr-4 hover:underline"><CgProfile /></li>
            <li className="cursor-pointer pr-4 hover:underline">
            <Link to="/carrito" className="hover:underline text-white cursor-pointer">
            <RiShoppingCartLine />
            </Link>
            </li>
            <li className="hover:underline pr-4 cursor-pointer text-red-500"><IoMdExit /></li>
        </ul>
      </div>
    </nav>
  )
}