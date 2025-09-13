import { useEffect, useState } from 'react';
import BarraLateral from './components/Layout/BarraLateral';
import Header from './components/Layout/Header';
import PanelDeControl from './components/PanelDeControl/PanelDeControl';
import ClientesList from './components/Clientes/ClientesList';
import ClienteForm from './components/Clientes/ClienteForm';
import VehiculosList from './components/Vehiculos/VehiculosList';
import VehiculoForm from './components/Vehiculos/VehiculoForm';
import PresupuestosList from './components/Presupuestos/PresupuestosList';
import PresupuestoForm from './components/Presupuestos/PresupuestoForm';
import { Cliente, Vehiculo, Presupuesto } from './types';
import LoginForm from "./components/Login/LoginForm";

function App() {
  const [vistaActual, setVistaActual] = useState('panelDeControl');
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Modal states
  const [mostrarClienteForm, setMostrarClienteForm] = useState(false);
  const [mostrarVehiculoForm, setMostrarVehiculoForm] = useState(false);
  const [mostrarPresupuestoForm, setMostrarPresupuestoForm] = useState(false);

  // Edit states
  const [editarCliente, setEditarCliente] = useState<Cliente | undefined>();
  const [editarVehiculo, setEditarVehiculo] = useState<Vehiculo | undefined>();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleViewChange = (view: string) => {
    setVistaActual(view);
    // Cerrar cualquier formulario abierto al cambiar de vista
    setMostrarClienteForm(false);
    setMostrarVehiculoForm(false);
    setMostrarPresupuestoForm(false);
    setEditarCliente(undefined);
    setEditarVehiculo(undefined);

  };

  const alternarBarraLateral = () => {
    setAbrirBarraLateral(!abrirBarraLateral);
  };

  // 🚨 Mostrar Login si no hay token
  if (!token) {
    return <LoginForm onLoginSuccess={setToken} />;
  }

  // Cliente handlers
  const handleAddCliente = () => {
    setEditarCliente(undefined);
    setMostrarClienteForm(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditarCliente(cliente);
    setMostrarClienteForm(true);
  };

  const handleSaveCliente = (cliente: Partial<Cliente>) => {
    console.log('Saving cliente:', cliente);
    // Aquí se implementaría la lógica para guardar el cliente
    setMostrarClienteForm(false);
    setEditarCliente(undefined);
  };

  const handleCancelClienteForm = () => {
    setMostrarClienteForm(false);
    setEditarCliente(undefined);
  };

  // Vehiculo handlers
  const handleAddVehiculo = () => {
    setEditarVehiculo(undefined);
    setMostrarVehiculoForm(true);
  };

  const handleEditVehiculo = (vehiculo: Vehiculo) => {
    setEditarVehiculo(vehiculo);
    setMostrarVehiculoForm(true);
  };

  const handleSaveVehiculo = (vehiculo: Partial<Vehiculo>) => {
    console.log('Saving vehiculo:', vehiculo);
    // Aquí se implementaría la lógica para guardar el vehículo
    setMostrarVehiculoForm(false);
    setEditarVehiculo(undefined);
  };

  const handleCancelVehiculoForm = () => {
    setMostrarVehiculoForm(false);
    setEditarVehiculo(undefined);
  };

  // Presupuesto handlers
  const handleAddPresupuesto = () => {

    setMostrarPresupuestoForm(true);
  };



  const handleSavePresupuesto = (presupuesto: Partial<Presupuesto>) => {
    console.log('Saving presupuesto:', presupuesto);
    // Aquí se implementaría la lógica para guardar el presupuesto
    setMostrarPresupuestoForm(false);

  };

  const handleCancelPresupuestoForm = () => {
    setMostrarPresupuestoForm(false);
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case 'panelDeControl':
        return <PanelDeControl />;
      case 'clientes':
        return (
          <ClientesList
            onAddCliente={handleAddCliente}
            onEditCliente={handleEditCliente}
          />
        );
      case 'vehiculos':
        return (
          <VehiculosList
            onAddVehiculo={handleAddVehiculo}
            onEditVehiculo={handleEditVehiculo}
          />
        );
      case 'presupuestos':
        return (
          <PresupuestosList
            onAddPresupuesto={handleAddPresupuesto}
            onEditPresupuesto={handleAddPresupuesto}
          />
        );
      default:
        return <PanelDeControl />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
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

        <main className="flex-1 overflow-auto">
          {renderContenido()}
        </main>
      </div>

      {/* Modals */}
      {mostrarClienteForm && (
        <ClienteForm
          cliente={editarCliente}
          onSave={handleSaveCliente}
          onCancel={handleCancelClienteForm}
        />
      )}

      {mostrarVehiculoForm && (
        <VehiculoForm
          vehiculo={editarVehiculo}
          onSave={handleSaveVehiculo}
          onCancel={handleCancelVehiculoForm}
        />
      )}

      {mostrarPresupuestoForm && (
        <PresupuestoForm
          onSave={handleSavePresupuesto}
          onCancel={handleCancelPresupuestoForm}
        />
      )}
    </div>
  );
}

export default App;