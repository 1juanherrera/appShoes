import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export const useLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
  
      try {
        const userData = await login(email, password);
        setSuccess(`Bienvenido, ${userData.nombreUsuario}`);
        console.log("Datos del usuario:", userData);
        navigate("/home");
      } catch (err) {
        setError(err.message);
      }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        success,
        handleSubmit
    }
}