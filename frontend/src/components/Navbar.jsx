import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";

export const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 text-white flex items-center">
      <div className="flex items-center justify-around">
        <h1 className="text-xl font-bold text-white">
          <Link to="/" className="text-white">AppShoes</Link>
        </h1>
        <ul className="space-x-4 flex m-5 border justify-between">
          <li>
            <Link to="/" className="hover:underline text-white cursor-pointer">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:underline text-white cursor-pointer">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline text-white cursor-pointer">
              Contacto
            </Link>
          </li>
        </ul>
        <ul className="flex m-5 border justify-around items-center w-xs">
            <li className="cursor-pointer hover:underline"><CgProfile /></li>
            <li className="cursor-pointer hover:underline"><RiShoppingCartLine /></li>
            <li className="cursor-pointer hover:underline"><MdFavoriteBorder /></li>
            <li className="hover:underline cursor-pointer"><IoMdExit /></li>
        </ul>
      </div>
      
    </nav>
  )
}