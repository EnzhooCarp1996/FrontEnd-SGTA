import { EstructuraPartes, NuevaParteDto, PartesVehiculo } from "../../types/PartesVehiculo";
import { createContext } from "react";

interface PartesVehiculoContextType {
  partesVehiculo: PartesVehiculo[];
  estructuraPartes: EstructuraPartes;
  loading: boolean;
  error: string | null;
  addComponente: (dto: NuevaParteDto) => Promise<string>;
}

export const PartesVehiculoContext = createContext<PartesVehiculoContextType>({
  partesVehiculo: [],
  estructuraPartes: {},
  loading: false,
  error: null,
  addComponente: async () => "",
});
