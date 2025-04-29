import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AdminUsuarios } from "./components/AdminUsuarios";
import { AdminProductos } from "./components/AdminProductos";
import { AdminCategorias } from "./components/AdminCategorias";
import AdminRoute from "./routes/adminRoute";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./routes/protectedRoute";
import { Error } from "./components/Error";
import { Navbar } from "./components/Navbar";
import { Categorias } from "./components/Categorias";
import { getToken } from "./utils/session";
import { ProductosCategoria } from "./components/ProductosCategoria";
import { Carrito } from "./components/Carrito";
import { Admin } from "./pages/Admin";

export const App = () => {
  const token = getToken();


  return (
    <Router>
      {token && <Navbar />}
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
           <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
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
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <Categorias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/categoria/:id"
          element={
            <ProtectedRoute>
              <ProductosCategoria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};