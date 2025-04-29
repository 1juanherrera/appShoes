

export const Search = ({ onSearch }) => {

  return (
          <input
            type="text"
            placeholder="Buscar productos..."
            className="p-2 rounded text-black"
            onChange={(e) => onSearch(e.target.value)}
          />
  )
}