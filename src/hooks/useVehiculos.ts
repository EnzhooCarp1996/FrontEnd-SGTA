import { useEffect, useState } from "react";
import {
  createVehiculo,
  getVehiculos,
  updateVehiculo,
  deleteVehiculo,
} from "../Services/VehiculoService";
import { getClientes } from "../Services/ClienteService";
import { Vehiculo, Cliente, NewVehiculo } from "../types";

export function useVehiculos(token: string | null) {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getVehiculos(token)
      .then((data) => setVehiculos(data))
      .catch((err) => setError(err.message));

    getClientes(token)
      .then((data) => setClientes(data))
      .catch((err) => setError(err.message));
  }, [token]);

  // -------------------------------
  // CREATE
  // -------------------------------

  const agregarVehiculo = async (nuevoVehiculo: NewVehiculo) => {
    if (!token) return;

    try {
      const vehiculoCreado = await createVehiculo(token, nuevoVehiculo);
      setVehiculos((prev) => [...prev, vehiculoCreado]);
      alert("🚗 Vehículo agregado correctamente ✅");
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
  const modificarVehiculo = async (id: number, vehiculoActualizado: Vehiculo) => {
    if (!token) return;

    try {
      const vehiculo = await updateVehiculo(token, id, vehiculoActualizado);
      setVehiculos((prev) =>
        prev.map((v) => (v.idVehiculo === vehiculo.idVehiculo ? vehiculo : v))
      );
      alert(
        `✏️ Vehículo: ${vehiculoActualizado.patente} actualizado correctamente ✅`
      );
      return vehiculo;
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌E Error al actualizar el vehículo: " + err.message);
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

  return { vehiculos, clientes, error, agregarVehiculo, modificarVehiculo, eliminarVehiculo };
}

export function filtrarVehiculos(
  vehiculos: Vehiculo[],
  searchTerm: string,
  filterEstado: string
) {
  return vehiculos.filter((vehiculo) => {
    const matchesSearch =
      vehiculo.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterEstado === "all" || vehiculo.estado === filterEstado;

    return matchesSearch && matchesFilter;
  });
}
