import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { Footer } from "./components/Footer"; // Importa el Footer
import { Categorias } from "./components/Categorias";
import { ProductosCategoria } from "./components/ProductosCategoria";
import { Carrito } from "./components/Carrito";
import { Admin } from "./pages/Admin";
import { Registro } from "./pages/Registro";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100"> {/* Contenedor principal */}
      <Router>
        <Navbar /> {/* Navbar siempre visible */}
        <div className="flex-grow-1"> {/* Contenido dinámico */}
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/error" element={<Error />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin/usuarios"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminUsuarios />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminProductos />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categorias"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminCategorias />
                  </AdminRoute>
                </ProtectedRoute>
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
        </div>
        <Footer /> {/* Footer siempre al final */}
      </Router>
    </div>
  );
};