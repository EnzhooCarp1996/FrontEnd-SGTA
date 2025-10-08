import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PresupuestoView from "../Presupuestos/PresupuestoView";
import { useAppContent } from "../../hooks/useAppContent";
import VehiculoView from "../Vehiculos/VehiculoView";
import ClienteView from "../Clientes/ClienteView";
import UsuarioView from "../Usuarios/UsuarioView";
import BarraLateral from "./BarraLateral";
import { Toaster } from "react-hot-toast";
import Header from "./Header";

const AppContent: React.FC = () => {
  const { role, abrirBarraLateral, alternarBarraLateral } = useAppContent();

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Toaster position="top-right" />

        {/* Barra lateral */}
        <BarraLateral
          role={role}
          isOpen={abrirBarraLateral}
          onToggle={alternarBarraLateral}
        />

        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header onMenuToggle={alternarBarraLateral} vistaActual="" />

          <main className="flex-1 overflow-auto">
            <Routes>
              {role === "Admin" ? (
                <>
                  <Route path="/usuarios" element={<UsuarioView />} />
                  <Route path="*" element={<Navigate to="/usuarios" />} />
                </>
              ) : (
                <>
                  <Route path="/clientes" element={<ClienteView />} />
                  <Route path="/vehiculos" element={<VehiculoView />} />
                  <Route path="/presupuestos" element={<PresupuestoView />} />
                  <Route path="*" element={<Navigate to="/clientes" />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppContent;
