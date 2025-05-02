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
import { OrdenCompra } from "./pages/OrdenCompra";
import { AdminOrdenes } from "./components/AdminOrdenes";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/home" element={
          <>
            <Navbar />
            <Home />
            <Footer /> {/* Agrega el Footer aquí */}
          </>
        } />
        <Route path="/error" element={<Error />} />

        {/* Rutas protegidas administrador */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute>
              <Navbar />
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
              <Navbar />
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
              <Navbar />
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
              <Navbar />
              <Admin />
            </ProtectedRoute>
          }
        />
           <Route
          path="/admin/ordenes"
          element={
            <ProtectedRoute>
              <Navbar />
              <AdminOrdenes />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navbar />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <Navbar />
              <Categorias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/categoria/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <ProductosCategoria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Navbar />
              <Carrito />
            </ProtectedRoute>
          }
        />  
        <Route
          path="/ordenes"
          element={
            <ProtectedRoute>
              <Navbar />
              <OrdenCompra />
            </ProtectedRoute>
          }
        />  
      </Routes>
    </Router>
  );
};