import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-5">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            &copy; {new Date().getFullYear()} appShoes. Todos los derechos reservados.
            </p>
            <div className="text-sm">
            <p>Desarrollado por <a href="https://www.linkedin.com/in/juanherreramu%C3%B1oz/" target="_blank" rel="noopener noreferrer">Juan Herrera</a> © Copyright 2025</p>
            <a className="text-white flex items-center justify-center" href="https://github.com/1juanherrera"><FaGithub size={20} /> <span className="pl-2">1juanherrera</span></a>
            </div>
        </div>
        </footer>
    );
}