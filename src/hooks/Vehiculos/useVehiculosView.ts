import { useClientes } from "../Clientes/useClientes";
import { NewVehiculo, Vehiculo } from "../../types";
import { useVehiculos } from "./useVehiculos";
import { useState } from "react";

export function useVehiculoView() {
  const {
    agregarVehiculo,
    modificarVehiculo,
  } = useVehiculos();
  const { clientes } = useClientes();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarVehiculo, setEditarVehiculo] = useState<Vehiculo | undefined>();

  const handleAdd = () => {
    setEditarVehiculo(undefined);
    setMostrarForm(true);
  };

  const handleEdit = (vehiculo: Vehiculo) => {
    setEditarVehiculo(vehiculo);
    setMostrarForm(true);
  };

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

  const handleCancel = () => {
    setEditarVehiculo(undefined);
    setMostrarForm(false);
  };

  return {
    clientes,
    mostrarForm,
    editarVehiculo,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
