// src/components/Layout/AppContent.tsx
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import BarraLateral from "./BarraLateral";
import Header from "./Header";
import PanelDeControl from "../PanelDeControl/PanelDeControl";
import ClientesList from "../Clientes/ClientesList";
import ClienteForm from "../Clientes/ClienteForm";
import VehiculosList from "../Vehiculos/VehiculosList";
import VehiculoForm from "../Vehiculos/VehiculoForm";
import PresupuestosList from "../Presupuestos/PresupuestosList";
import PresupuestoForm from "../Presupuestos/PresupuestoForm";
import { Cliente, Vehiculo, Presupuesto, NewVehiculo } from "../../types";
import { useVehiculos } from "../../hooks/useVehiculos";

interface AppContentProps {
  token: string;
  onLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ onLogout }) => {
  const token = localStorage.getItem("token");

  // Hook que maneja la data de vehiculos
  const {
    vehiculos,
    clientes,
    error,
    agregarVehiculo,
    modificarVehiculo,
    eliminarVehiculo,
  } = useVehiculos(token);

  const [vistaActual, setVistaActual] = useState("panelDeControl");
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);

  const [mostrarClienteForm, setMostrarClienteForm] = useState(false);
  const [mostrarVehiculoForm, setMostrarVehiculoForm] = useState(false);
  const [mostrarPresupuestoForm, setMostrarPresupuestoForm] = useState(false);

  const [editarCliente, setEditarCliente] = useState<Cliente | undefined>();
  const [editarVehiculo, setEditarVehiculo] = useState<Vehiculo | undefined>();

  const alternarBarraLateral = () => setAbrirBarraLateral(!abrirBarraLateral);



  const handleViewChange = (view: string) => {
    setVistaActual(view);
    setMostrarClienteForm(false);
    setMostrarVehiculoForm(false);
    setMostrarPresupuestoForm(false);
    setEditarCliente(undefined);
    setEditarVehiculo(undefined);
  };

  // Handlers de Cliente
  const handleAddCliente = () => { setEditarCliente(undefined); setMostrarClienteForm(true); };
  const handleEditCliente = (cliente: Cliente) => { setEditarCliente(cliente); setMostrarClienteForm(true); };
  const handleSaveCliente = (cliente: Partial<Cliente>) => { console.log(cliente); setMostrarClienteForm(false); setEditarCliente(undefined); };
  const handleCancelClienteForm = () => { setMostrarClienteForm(false); setEditarCliente(undefined); };

  // Handlers de Vehículo
  const handleAddVehiculo = () => { setEditarVehiculo(undefined); setMostrarVehiculoForm(true); };
  const handleEditVehiculo = (vehiculo: Vehiculo) => { setEditarVehiculo(vehiculo); setMostrarVehiculoForm(true); };
  const handleSaveVehiculo = async (vehiculo: Partial<Vehiculo>) => {
    try {
      if (editarVehiculo) {
        // Aseguramos que el id se mantenga
        const vehiculoCompleto: Vehiculo = { ...editarVehiculo, ...vehiculo };
        await modificarVehiculo(vehiculoCompleto);
      } else {
        await agregarVehiculo(vehiculo as NewVehiculo);
      }
      setMostrarVehiculoForm(false);
      setEditarVehiculo(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelVehiculoForm = () => { setEditarVehiculo(undefined); setMostrarVehiculoForm(false); };

  // Handlers de Presupuesto
  const handleAddPresupuesto = () => setMostrarPresupuestoForm(true);
  const handleSavePresupuesto = (presupuesto: Partial<Presupuesto>) => { console.log(presupuesto); setMostrarPresupuestoForm(false); };
  const handleCancelPresupuestoForm = () => setMostrarPresupuestoForm(false);

  const renderContenido = () => {
    switch (vistaActual) {
      case "panelDeControl": return <PanelDeControl />;
      case "clientes": return <ClientesList onAddCliente={handleAddCliente} onEditCliente={handleEditCliente} />;
      case "vehiculos": return <VehiculosList
        onAddVehiculo={handleAddVehiculo}
        onEditVehiculo={handleEditVehiculo}
        eliminarVehiculo={eliminarVehiculo}
        vehiculos={vehiculos}
        clientes={clientes}
        error={error} />;
      case "presupuestos": return <PresupuestosList onAddPresupuesto={handleAddPresupuesto} onEditPresupuesto={handleAddPresupuesto} />;
      default: return <PanelDeControl />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      <BarraLateral vistaActual={vistaActual} onViewChange={handleViewChange} isOpen={abrirBarraLateral} onToggle={alternarBarraLateral} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header onMenuToggle={alternarBarraLateral} vistaActual={vistaActual} onLogout={onLogout} />
        <main className="flex-1 overflow-auto">{renderContenido()}</main>
      </div>

      {mostrarClienteForm && <ClienteForm cliente={editarCliente} onSave={handleSaveCliente} onCancel={handleCancelClienteForm} />}
      {mostrarVehiculoForm && <VehiculoForm vehiculo={editarVehiculo} onSave={handleSaveVehiculo} onCancel={handleCancelVehiculoForm} />}
      {mostrarPresupuestoForm && <PresupuestoForm onSave={handleSavePresupuesto} onCancel={handleCancelPresupuestoForm} />}
    </div>
  );
};

export default AppContent;
