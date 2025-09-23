import PanelDeControl from "../PanelDeControl/PanelDeControl";
import PresupuestoView from "../Presupuestos/PresupuestoView";
import VehiculoView from "../Vehiculos/VehiculosView";
import ClienteView from "../Clientes/ClienteView";
import UsuarioView from "../Usuarios/UsuarioView";
import { Toaster } from "react-hot-toast";
import BarraLateral from "./BarraLateral";
import { useState } from "react";
import Header from "./Header";
import { useAuth } from "../../hooks/useAuth";

const AppContent: React.FC = () => {
  const { role } = useAuth();
  const [vistaActual, setVistaActual] = useState("panelDeControl");
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);

  const alternarBarraLateral = () => setAbrirBarraLateral(!abrirBarraLateral);
  const handleViewChange = (view: string) => setVistaActual(view);

  const renderContenido = () => {

    if (role === "Admin") return <UsuarioView />;

    switch (vistaActual) {
      // case "panelDeControl":
      //   return <PanelDeControl />;
      case "clientes":
        return <ClienteView />;
      case "vehiculos":
        return <VehiculoView />; //
      case "presupuestos":
        return <PresupuestoView />;
      case "usuarios":
        return <UsuarioView />;
      default:
        return <PanelDeControl />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      <BarraLateral
        vistaActual={vistaActual}
        onViewChange={handleViewChange}
        isOpen={abrirBarraLateral}
        onToggle={alternarBarraLateral}
        role={role}
      />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header
          onMenuToggle={alternarBarraLateral}
          vistaActual={vistaActual}
        />
        <main className="flex-1 overflow-auto">{renderContenido()}</main>
      </div>
    </div>
  );
};

export default AppContent;
