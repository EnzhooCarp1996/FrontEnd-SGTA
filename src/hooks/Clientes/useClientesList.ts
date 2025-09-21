import { filtrarClientes } from "../../helpers/utilsClientes";
import { useClientes } from "./useClientes";
import { useState, useMemo } from "react";
import { Cliente } from "../../types";

export function useClientesList() {
  const { clientes, errorCliente, eliminarCliente } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterType] = useState<"all" | "persona" | "empresa">(
    "all"
  );

  const filteredClientes: Cliente[] = useMemo(
    () => filtrarClientes(clientes, searchTerm, filterTipo),
    [clientes, searchTerm, filterTipo]
  );

  return {
    clientes,
    errorCliente,
    eliminarCliente,
    searchTerm,
    setSearchTerm,
    filterTipo,
    setFilterType,
    filteredClientes,
  };
}
