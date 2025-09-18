import { useEffect, useState } from "react";
import {
  createVehiculo,
  getVehiculos,
  updateVehiculo,
  deleteVehiculo,
  getMarcas,
  getModelos,
} from "../Services/VehiculoService";
import { getClientes } from "../Services/ClienteService";
import { Vehiculo, Cliente, NewVehiculo } from "../types";

export function useVehiculos(token: string | null) {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [marcas, setMarcas] = useState<{ id: number; brand: string }[]>([]);
  const [modelos, setModelos] = useState<{ id: number; model: string }[]>([]);

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
      alert(`🚗 ¡Agregado correctamente!\n ✅Vehiculo:
        ${nuevoVehiculo.marca}
        ${nuevoVehiculo.modelo}
        ${nuevoVehiculo.nroDeChasis}
        ${nuevoVehiculo.patente}`);
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

const cargarMarcasYModelos = async (marcaSeleccionada?: string) => {
  if (!token) return;

  try {
    // Traigo marcas
    const data: any = await getMarcas(token);

    if (!Array.isArray(data.Makes)) {
      console.error("getMarcas.Makes no es un array:", data);
      return;
    }

    const marcasMapeadas = data.Makes.map((m: any, i: number) => ({
      id: m.make_id || i,
      brand: m.make_display || m.make_name || m,
    }));
    setMarcas(marcasMapeadas);

    // Si hay marca seleccionada, traigo modelos
    if (marcaSeleccionada) {
      const modelosData: any = await getModelos(token, marcaSeleccionada);

      if (!Array.isArray(modelosData.Models)) {
        console.error("getModelos.Models no es un array:", modelosData);
        return;
      }

      const modelosMapeados = modelosData.Models.map((m: any) => ({
        id: m.model_id,
        model: m.model_name || m.model_display,
      }));
      setModelos(modelosMapeados);
    } else {
      setModelos([]); // limpio modelos si no hay marca
    }
  } catch (err) {
    console.error("Error cargando marcas o modelos:", err);
  }
};



  return {
    vehiculos,
    clientes,
    error,
    marcas,
    modelos,
    agregarVehiculo,
    modificarVehiculo,
    eliminarVehiculo,
    cargarMarcasYModelos,
  };
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
