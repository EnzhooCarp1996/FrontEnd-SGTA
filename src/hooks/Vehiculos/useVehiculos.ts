import { Vehiculo, NewVehiculo } from "../../types";
import { useEffect, useState } from "react";
import {
  createVehiculo,
  getVehiculos,
  updateVehiculo,
  deleteVehiculo,
} from "../../Services/VehiculoService";

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // FETCH INICIAL
  // -------------------------------
  useEffect(() => {
    getVehiculos()
      .then((data) => setVehiculos(data))
      .catch((err) => setError(err.message));
  }, []);

  // -------------------------------
  // CREATE
  // -------------------------------
  const agregarVehiculo = async (newVehiculo: NewVehiculo) => {
    try {
      const vehiculoCreado = await createVehiculo(newVehiculo);
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
    try {
      const vehiculo = await updateVehiculo(vehiculoActualizado);
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

  // -------------------------------
  // DELETE
  // -------------------------------
  const eliminarVehiculo = async (id: number) => {
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este vehículo?"
    );
    if (!confirmar) return;

    try {
      await deleteVehiculo(id);
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
