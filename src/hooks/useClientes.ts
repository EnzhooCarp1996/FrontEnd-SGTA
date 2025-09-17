import { useState, useEffect } from "react";
import { getClientes, deleteCliente } from "../Services/ClienteService";
import { Cliente } from "../types";

export function useClientes(token: string | null) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    
    getClientes(token)
      .then((data) => setClientes(data))
      .catch((err) => setError(err.message))
  }, [token]);

  const eliminarCliente = async (id: number) => {
    if (!token) return;
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de eliminar este cliente?"
    );
    if (!confirmar) return;

    try {
      await deleteCliente(token, id);
      setClientes((prev) => prev.filter((c) => c.idCliente !== id));
      alert("Cliente eliminado correctamente ✅");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error al eliminar el cliente: " + err.message);
      } else {
        alert("❌ Error desconocido al eliminar el cliente");
      }
    }
  };

  return { clientes, error, eliminarCliente };
}

export function useClienteFilters(clientes: Cliente[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "persona" | "empresa">(
    "all"
  );

  const filteredClientes = clientes.filter((cliente) => {
    const isEmpresa = cliente.tipoCliente === "Empresa";
    const matchesSearch = isEmpresa
      ? cliente.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.nombreDeFantasia
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : `${cliente.nombre} ${cliente.apellido}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "empresa" && isEmpresa) ||
      (filterType === "persona" && !isEmpresa);

    return matchesSearch && matchesFilter;
  });

  return {
    filteredClientes,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  };
}
