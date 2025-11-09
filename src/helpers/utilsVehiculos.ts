import { Vehiculo } from "../types";

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "No definida";
  return new Date(dateString).toLocaleDateString("es-AR");
};

export const formatearFecha = (fecha?: string) => fecha?.split("T")[0] || "";

export const getDaysFromNow = (dateString?: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const getStatusColor = (estado: string) => {
  switch (estado) {
    case "Recibido":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "No Recibido":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Proceso":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Entregado":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const filtrarVehiculos = (
  vehiculos: Vehiculo[],
  searchTerm: string,
  filterEstado: string
) => {
  return vehiculos.filter((vehiculo) => {
    const matchesSearch =
      vehiculo.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterEstado === "all" || vehiculo.estado === filterEstado;

    return matchesSearch && matchesFilter;
  });
};

export const estados = [
  { value: "all", label: "Todos los estados" },
  { value: "No Recibido", label: "No Recibido" },
  { value: "Recibido", label: "Recibido" },
  { value: "Proceso", label: "En Proceso" },
  { value: "Entregado", label: "Entregado" },
];
