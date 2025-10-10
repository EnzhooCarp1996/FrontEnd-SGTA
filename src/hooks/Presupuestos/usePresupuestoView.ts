import { usePresupuestos } from "..//Presupuestos/usePresupuestos";
import { NewPresupuesto, PresupuestoData } from "../../types";
import { useVehiculos } from "../Vehiculos/useVehiculos";
import { useClientes } from "../Clientes/useClientes";
import { useState } from "react";

export function usePresupuestoView() {
  const {
    agregarPresupuesto,
    modificarPresupuesto,
  } = usePresupuestos();
  const { clientes } = useClientes();
  const { vehiculos } = useVehiculos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarPresupuesto, setEditarPresupuesto] = useState<
    PresupuestoData | undefined
  >();

  const handleAdd = () => {
    setEditarPresupuesto(undefined);
    setMostrarForm(true);
  };

  const handleEdit = (presupuesto: PresupuestoData) => {
    setEditarPresupuesto(presupuesto);
    setMostrarForm(true);
  };

  const handleSave = async (presupuesto: Partial<PresupuestoData>) => {
    try {
      if (editarPresupuesto) {
        const presupuestoCompleto: PresupuestoData = {
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
    vehiculos,
    clientes,
    mostrarForm,
    editarPresupuesto,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
