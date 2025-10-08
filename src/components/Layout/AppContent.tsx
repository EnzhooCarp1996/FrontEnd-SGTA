import PresupuestoView from "../Presupuestos/PresupuestoView";
import { useAppContent } from "../../hooks/useAppContent";
import VehiculoView from "../Vehiculos/VehiculoView";
import ClienteView from "../Clientes/ClienteView";
import UsuarioView from "../Usuarios/UsuarioView";
import { Toaster } from "react-hot-toast";
import BarraLateral from "./BarraLateral";
import Header from "./Header";

const AppContent: React.FC = () => {
  const { role, vistaActual, abrirBarraLateral, alternarBarraLateral, handleViewChange, renderContenido } = useAppContent();

  const renderComponent = () => {
    const vista = renderContenido();

    switch (vista) {
      case "clientes":
        return <ClienteView />;
      case "vehiculos":
        return <VehiculoView />;
      case "presupuestos":
        return <PresupuestoView />;
      case "usuarios":
        return <UsuarioView />;
      default:
        return <ClienteView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      <BarraLateral vistaActual={vistaActual} onViewChange={handleViewChange} isOpen={abrirBarraLateral} onToggle={alternarBarraLateral} role={role} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header onMenuToggle={alternarBarraLateral} vistaActual={vistaActual} />
        <main className="flex-1 overflow-auto">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default AppContent;
