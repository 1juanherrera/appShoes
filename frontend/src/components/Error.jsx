

export const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg">No se encontraron datos del usuario. Por favor, inicia sesión.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}