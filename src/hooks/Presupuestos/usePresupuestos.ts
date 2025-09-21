import { useEffect, useState } from "react";
import {
  createPresupuesto,
  getPresupuestos,
  updatePresupuesto,
  deletePresupuesto,
} from "../../Services/PresupuestoService";
import { Presupuesto, NewPresupuesto } from "../../types";
import { useAuth } from "../useAuth";

export function usePresupuestos() {
  const { token } = useAuth();
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getPresupuestos(token)
      .then((data) => setPresupuestos(data))
      .catch((err) => setError(err.message));
  }, [token]);

  // -------------------------------
  // CREATE
  // -------------------------------

  const agregarPresupuesto = async (newPresupuesto: NewPresupuesto) => {
    if (!token) return;

    try {
      const presupuestoCreado = await createPresupuesto(token, newPresupuesto);
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
  const modificarPresupuesto = async (presupuestoActualizado: Presupuesto) => {
    if (!token) return;

    try {
      const presupuesto = await updatePresupuesto(
        token,
        presupuestoActualizado
      );
      setPresupuestos((prev) =>
        prev.map((p) =>
          p.idPresupuesto === presupuesto.idPresupuesto ? presupuesto : p
        )
      );
      alert(
        `✏️ Presupuesto: ${presupuestoActualizado.idPresupuesto} actualizado correctamente ✅`
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

  const eliminarPresupuesto = async (id: number) => {
    if (!token) return;

    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este Presupuesto?"
    );
    if (!confirmar) return;

    try {
      await deletePresupuesto(token, id);
      setPresupuestos((prev) => prev.filter((p) => p.idPresupuesto !== id));
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
