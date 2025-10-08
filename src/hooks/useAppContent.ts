import { useState } from "react";
import { useAuth } from "./useAuth";

export const useAppContent = () => {
  const { role } = useAuth();
  const [vistaActual, setVistaActual] = useState("clientes");
  const [abrirBarraLateral, setAbrirBarraLateral] = useState(false);

  const alternarBarraLateral = () => setAbrirBarraLateral((prev) => !prev);
  const handleViewChange = (view: string) => setVistaActual(view);

  const renderContenido = () => {
    if (role === "Admin") return "usuarios"; // devolver clave de vista para simplificar, se renderiza en AppContent

    switch (vistaActual) {
      case "clientes":
        return "clientes";
      case "vehiculos":
        return "vehiculos";
      case "presupuestos":
        return "presupuestos";
      case "usuarios":
        return "usuarios";
      default:
        return "clientes";
    }
  };

  return {
    role,
    vistaActual,
    abrirBarraLateral,
    alternarBarraLateral,
    handleViewChange,
    renderContenido,
  };
};
