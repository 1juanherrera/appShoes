import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import AdminUsuarios from "./components/AdminUsuarios";
import AdminProductos from "./components/AdminProductos";
import AdminCategorias from "./components/AdminCategorias";
import AdminRoute from "./routes/adminRoute";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./routes/protectedRoute";
import { Error } from "./components/Error";

export const App = () => {

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<Error />} />


        {/* Rutas protegidas para administradores */}
        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <AdminUsuarios />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <AdminProductos />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <AdminRoute>
              <AdminCategorias />
            </AdminRoute>
          }
        />
        {/* Rutas protegidas para usuarios autenticados */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
