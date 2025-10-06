import { usePresupuestos } from "./usePresupuestos";
import { useState } from "react";

export function usePresupuestosList() {
  const { presupuestos, error, eliminarPresupuesto } = usePresupuestos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState<string>("all");

  // -------------------------------
  // Filtrado y búsqueda
  // -------------------------------
  const filteredPresupuestos = presupuestos.filter((presupuesto) => {
    const matchesSearch = presupuesto._id.toString().includes(searchTerm);

    const presupuestoMonth = new Date(presupuesto.fecha).getMonth();
    const currentMonth = new Date().getMonth();
    const matchesFilter =
      filterMonth === "all" ||
      (filterMonth === "current" && presupuestoMonth === currentMonth) ||
      (filterMonth === "previous" && presupuestoMonth === currentMonth - 1);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("es-AR");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);

  const opcionesMeses = [
    { value: "all", label: "Todos los Meses" },
    { value: "current", label: "Mes actual" },
    { value: "previous", label: "Mes anterior" },
  ];

  return {
    presupuestos,
    error,
    searchTerm,
    setSearchTerm,
    filterMonth,
    setFilterMonth,
    filteredPresupuestos,
    eliminarPresupuesto,
    formatDate,
    formatCurrency,
    opcionesMeses,
  };
}
