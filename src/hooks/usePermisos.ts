import { useAuth } from "./useAuth";

export function usePermisos() {
  const { role } = useAuth();

  const puedeModificar = role === "Admin" || role === "Encargado";
  const esAdmin = role === "Admin";
  const esEncargado = role === "Encargado";
  const esUsuarioComun = role === "Empleado";

  return {
    puedeModificar,
    esAdmin,
    esEncargado,
    esUsuarioComun,
  };
}
