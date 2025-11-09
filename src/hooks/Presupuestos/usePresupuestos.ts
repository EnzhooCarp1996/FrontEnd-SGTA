import { useEffect, useState } from "react";
import {
  createPresupuesto,
  getPresupuestos,
  updatePresupuesto,
  deletePresupuesto,
} from "../../Services/PresupuestoService";
import { PresupuestoData, NewPresupuesto } from "../../types";

export function usePresupuestos() {
  const [presupuestos, setPresupuestos] = useState<PresupuestoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPresupuestos()
      .then((data) => setPresupuestos(data))
      .catch((err) => setError(err.message));
  }, []);

  // -------------------------------
  // CREATE
  // -------------------------------
  const agregarPresupuesto = async (newPresupuesto: NewPresupuesto) => {
    try {
      const presupuestoCreado = await createPresupuesto(newPresupuesto);
      setPresupuestos((prev) => [...prev, presupuestoCreado]);
      alert(`🚗 ¡Agregado correctamente!\n ✅Presupuesto:
        ${newPresupuesto.idCliente}`);
      return presupuestoCreado;
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al crear el presupuesto: " + err.message);
      } else {
        alert("❌ Error desconocido al crear el presupuesto");
      }
      throw err;
    }
  };

  // -------------------------------
  // UPDATE
  // -------------------------------
  const modificarPresupuesto = async (newPresupuesto: PresupuestoData) => {
    try {
      const presupuesto = await updatePresupuesto(newPresupuesto);
      setPresupuestos((prev) =>
        prev.map((p) => (p._id === presupuesto._id ? presupuesto : p))
      );
      alert(
        `✏️ Presupuesto: ${newPresupuesto._id} actualizado correctamente ✅`
      );
      return presupuesto;
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al actualizar el presupuesto: " + err.message);
      } else {
        alert("❌ Error desconocido al actualizar el presupuesto");
      }
      throw err;
    }
  };

  const eliminarPresupuesto = async (id: string) => {
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este Presupuesto?"
    );
    if (!confirmar) return;

    try {
      await deletePresupuesto(id);
      setPresupuestos((prev) => prev.filter((p) => p._id !== id));
      alert("Presupuesto eliminado correctamente ✅");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al eliminar el presupuesto: " + err.message);
      } else {
        alert("❌ Error desconocido al eliminar el presupuesto");
      }
    }
  };

  return {
    presupuestos,
    error,
    agregarPresupuesto,
    modificarPresupuesto,
    eliminarPresupuesto,
  };
}
