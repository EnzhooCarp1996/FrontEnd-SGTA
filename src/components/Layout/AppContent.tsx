import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import BarraLateral from "./BarraLateral";
import Header from "./Header";
import PanelDeControl from "../PanelDeControl/PanelDeControl";
import ClienteView from "../Clientes/ClienteView";
import VehiculoView from "../Vehiculos/VehiculosView";
import PresupuestoView from "../Presupuestos/PresupuestoView";

const AppContent: React.FC = () => {
  const [vistaActual, setVistaActual] = useState("panelDeControl");
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);

  const alternarBarraLateral = () => setAbrirBarraLateral(!abrirBarraLateral);
  const handleViewChange = (view: string) => setVistaActual(view);

  const renderContenido = () => {
    switch (vistaActual) {
      case "panelDeControl":
        return <PanelDeControl />;
      case "clientes":
        return <ClienteView />; // ya no necesita token por prop
      case "vehiculos":
        return <VehiculoView />; // idem
      case "presupuestos":
        return <PresupuestoView />;
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
