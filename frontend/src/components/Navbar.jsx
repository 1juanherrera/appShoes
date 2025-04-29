import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Logout from "./Logout";

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
              <span className="ml-2">Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/categorias" className="hover:underline text-white cursor-pointer flex justify-center items-center text-3xl">
            <BiCategoryAlt />
            <span className="ml-2">Categorias</span>
            </Link>
          </li>
          <li>
            <Link to="/admin" className="admin hover:underline cursor-pointer flex justify-center items-center text-3xl">
            <MdOutlineAdminPanelSettings />
            <span className="ml-2">Admin</span>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-end items-center w-xs text-3xl">
            <li className="cursor-pointer pr-4">
            <Link to="/profile" className="hover:underline text-white cursor-pointer">
            <CgProfile />
            </Link>
            </li>
            <li className="pr-4 ">
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
  )
}