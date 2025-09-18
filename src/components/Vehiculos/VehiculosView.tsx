import React, { useState } from "react";
import VehiculosList from "./VehiculosList";
import VehiculoForm from "./VehiculoForm";
import { Vehiculo, NewVehiculo } from "../../types";
import { useVehiculos } from "../../hooks/useVehiculos";


const VehiculoView: React.FC = () => {
  const { vehiculos, clientes, error, agregarVehiculo, modificarVehiculo, eliminarVehiculo } = useVehiculos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarVehiculo, setEditarVehiculo] = useState<Vehiculo | undefined>();

  const handleAdd = () => { setEditarVehiculo(undefined); setMostrarForm(true); };
  const handleEdit = (vehiculo: Vehiculo) => { setEditarVehiculo(vehiculo); setMostrarForm(true); };

  const handleSave = async (vehiculo: Partial<Vehiculo>) => {
    try {
      if (editarVehiculo) {
        const vehiculoCompleto: Vehiculo = { ...editarVehiculo, ...vehiculo };
        await modificarVehiculo(vehiculoCompleto);
      } else {
        await agregarVehiculo(vehiculo as NewVehiculo);
      }
      setMostrarForm(false);
      setEditarVehiculo(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => { setEditarVehiculo(undefined); setMostrarForm(false); };

  return (
    <>
      <VehiculosList
        onAddVehiculo={handleAdd}
        onEditVehiculo={handleEdit}
        eliminarVehiculo={eliminarVehiculo}
        vehiculos={vehiculos}
        clientes={clientes}
        error={error}
      />
      {mostrarForm && (
        <VehiculoForm
          vehiculo={editarVehiculo}
          onSave={handleSave}
          onCancel={handleCancel}
          clientes={clientes}
        />
      )}
    </>
  );
};

export default VehiculoView;
