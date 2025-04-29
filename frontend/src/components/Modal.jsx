import { IoMdClose } from "react-icons/io";

export const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
        {children}
      </div>
      <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-800 transition-colors"
        >
          <IoMdClose className="text-3xl"/>
        </button>
    </div>
  );
};
