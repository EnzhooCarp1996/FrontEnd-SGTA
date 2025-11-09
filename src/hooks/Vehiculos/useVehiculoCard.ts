import { getDaysFromNow } from "../../helpers/utilsVehiculos";
import { Cliente, Vehiculo } from "../../types";
import { useMemo } from "react";

export const useVehiculoCard = (vehiculo: Vehiculo, clientes: Cliente[]) => {
  const daysToExpected = getDaysFromNow(vehiculo.fechaEsperada);
  const isOverdue = useMemo(
    () => daysToExpected !== null && daysToExpected < 0 && vehiculo.estado !== "Entregado",
    [daysToExpected, vehiculo.estado]
  );

  const getClienteNombre = (idCliente?: number | null) => {
    if (!idCliente) return "Sin Cliente";
    const cliente = clientes.find(c => c.idCliente === idCliente);
    if (!cliente) return "Sin Cliente";
    return cliente.tipoCliente === "Empresa"
      ? cliente.nombreDeFantasia
      : `${cliente.nombre} ${cliente.apellido}`;
  };

  return { isOverdue, getClienteNombre };
};
