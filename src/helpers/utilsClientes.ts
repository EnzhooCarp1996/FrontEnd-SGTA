import { Cliente } from "../types";

export const filtrarClientes = (
  clientes: Cliente[],
  searchTerm: string,
  filterTipo: "all" | "persona" | "empresa"
) => {
  return clientes.filter((cliente) => {
    const isEmpresa = cliente.tipoCliente === "Empresa";

    const matchesSearch = isEmpresa
      ? cliente.razonSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.nombreDeFantasia?.toLowerCase().includes(searchTerm.toLowerCase())
      : `${cliente.nombre} ${cliente.apellido}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterTipo === "all" ||
      (filterTipo === "empresa" && isEmpresa) ||
      (filterTipo === "persona" && !isEmpresa);

    return matchesSearch && matchesFilter;
  });
};

export function getResponsabilidadColor(responsabilidad: string) {
  switch (responsabilidad) {
    case 'ConsumidorFinal': return 'bg-blue-100 text-blue-800';
    case 'Monotributista': return 'bg-green-100 text-green-800';
    case 'ResponsableInscripto': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export const tipos: { value: "all" | "persona" | "empresa"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "persona", label: "Personas" },
  { value: "empresa", label: "Empresas" },
];