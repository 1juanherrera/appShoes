import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";

export const Message = ({ mensaje, tipo, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const getMessageConfig = () => {
    switch (tipo) {
      case "success":
        return {
          bgColor: "bg-green-500",
          textColor: "text-green-500",
          icon: <FaCheckCircle className="text-2xl text-green-500" />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-500",
          textColor: "text-yellow-500",
          icon: <FaExclamationCircle className="text-2xl text-yellow-500" />,
        };
      case "error":
      default:
        return {
          bgColor: "bg-red-500",
          textColor: "text-red-500",
          icon: <FaTimesCircle className="text-2xl text-red-500" />,
        };
    }
  };

  const { bgColor, textColor, icon } = getMessageConfig();

  return (
    <div className="fixed top-4 right-4 rounded-2xl shadow-lg z-index-50 bg-white">
      <div className={`text-white ${bgColor} flex justify-end p-1 w-full h-5 rounded-t-2xl`}></div>

      <div className="flex justify-center items-center p-2">
        {icon}
        <p className={`font-medium m-0 p-3 ${textColor}`}>{mensaje}</p>
      </div>
    </div>
  );
};