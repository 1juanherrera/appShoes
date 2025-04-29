

export const Search = ({ onSearch }) => {

  return (
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-md px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-800 placeholder-gray-400 shadow focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-150 ease-in-out"

            onChange={(e) => onSearch(e.target.value)}
          />
  )
}