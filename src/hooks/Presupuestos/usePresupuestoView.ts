import { usePresupuestos } from "..//Presupuestos/usePresupuestos";
import { NewPresupuesto, Presupuesto } from "../../types";
import { useVehiculos } from "../Vehiculos/useVehiculos";
import { useClientes } from "../Clientes/useClientes";
import { useState } from "react";

export function usePresupuestoView() {
  const {
    presupuestos,
    error,
    agregarPresupuesto,
    modificarPresupuesto,
    eliminarPresupuesto,
  } = usePresupuestos();
  const { clientes } = useClientes();
  const { vehiculos } = useVehiculos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarPresupuesto, setEditarPresupuesto] = useState<
    Presupuesto | undefined
  >();

  const handleAdd = () => {
    setEditarPresupuesto(undefined);
    setMostrarForm(true);
  };

  const handleEdit = (presupuesto: Presupuesto) => {
    setEditarPresupuesto(presupuesto);
    setMostrarForm(true);
  };

  const handleSave = async (presupuesto: Partial<Presupuesto>) => {
    try {
      if (editarPresupuesto) {
        const presupuestoCompleto: Presupuesto = {
          ...editarPresupuesto,
          ...presupuesto,
        };
        await modificarPresupuesto(presupuestoCompleto);
      } else {
        await agregarPresupuesto(presupuesto as NewPresupuesto);
      }
      setMostrarForm(false);
      setEditarPresupuesto(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditarPresupuesto(undefined);
    setMostrarForm(false);
  };

  return {
    presupuestos,
    vehiculos,
    clientes,
    error,
    mostrarForm,
    editarPresupuesto,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    eliminarPresupuesto,
  };
}
