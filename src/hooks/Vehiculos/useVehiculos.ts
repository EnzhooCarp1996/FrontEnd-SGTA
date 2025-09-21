import { Vehiculo, NewVehiculo } from "../../types";
import { useEffect, useState } from "react";
import {
  createVehiculo,
  getVehiculos,
  updateVehiculo,
  deleteVehiculo,
} from "../../Services/VehiculoService";
import { useAuth } from "../useAuth";

export function useVehiculos() {
  const { token } = useAuth();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getVehiculos(token)
      .then((data) => setVehiculos(data))
      .catch((err) => setError(err.message));
  }, [token]);

  // -------------------------------
  // CREATE
  // -------------------------------

  const agregarVehiculo = async (newVehiculo: NewVehiculo) => {
    if (!token) return;

    try {
      const vehiculoCreado = await createVehiculo(token, newVehiculo);
      setVehiculos((prev) => [...prev, vehiculoCreado]);
      alert(`🚗 ¡Agregado correctamente!\n ✅Vehiculo:
        ${newVehiculo.marca}
        ${newVehiculo.modelo}
        ${newVehiculo.nroDeChasis}
        ${newVehiculo.patente}`);
      return vehiculoCreado;
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al crear el vehículo: " + err.message);
      } else {
        alert("❌ Error desconocido al crear el vehículo");
      }
      throw err;
    }
  };

  // -------------------------------
  // UPDATE
  // -------------------------------
  const modificarVehiculo = async (vehiculoActualizado: Vehiculo) => {
    if (!token) return;

    try {
      const vehiculo = await updateVehiculo(token, vehiculoActualizado);
      setVehiculos((prev) =>
        prev.map((v) => (v.idVehiculo === vehiculo.idVehiculo ? vehiculo : v))
      );
      alert(
        `✏️ Vehículo: ${vehiculoActualizado.patente} actualizado correctamente ✅`
      );
      return vehiculo;
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al actualizar el vehículo: " + err.message);
      } else {
        alert("❌ Error desconocido al actualizar el vehículo");
      }
      throw err;
    }
  };

  const eliminarVehiculo = async (id: number) => {
    if (!token) return;

    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este vehículo?"
    );
    if (!confirmar) return;

    try {
      await deleteVehiculo(token, id);
      setVehiculos((prev) => prev.filter((v) => v.idVehiculo !== id));
      alert("Vehículo eliminado correctamente ✅");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al eliminar el vehículo: " + err.message);
      } else {
        alert("❌ Error desconocido al eliminar el vehículo");
      }
    }
  };

  return {
    vehiculos,
    error,
    agregarVehiculo,
    modificarVehiculo,
    eliminarVehiculo,
  };
}
