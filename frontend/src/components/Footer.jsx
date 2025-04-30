

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-5">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            &copy; {new Date().getFullYear()} appShoes. Todos los derechos reservados.
            </p>
            <div className="text-sm">
            <p>Desarrollado por <a href="https://juan-herrera.dev" target="_blank" rel="noopener noreferrer">Juan Herrera</a> © Copyright 2025</p>
            </div>
        </div>
        </footer>
    );
}