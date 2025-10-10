import { filtrarVehiculos } from "../../helpers/utilsVehiculos";
import { useClientes } from "../Clientes/useClientes";
import { useVehiculos } from "./useVehiculos";
import { useState } from "react";

export const useVehiculosList = () => {
  const { vehiculos, error, eliminarVehiculo } = useVehiculos();
  const { clientes } = useClientes();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("all");

  const filteredVehiculos = filtrarVehiculos(vehiculos, searchTerm, filterEstado);

  return {
    vehiculos,
    clientes,
    error,
    eliminarVehiculo,
    searchTerm,
    setSearchTerm,
    filterEstado,
    setFilterEstado,
    filteredVehiculos,
  };
};
