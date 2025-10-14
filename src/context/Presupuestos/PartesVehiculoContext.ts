import { createContext } from "react";
import { EstructuraPartes } from "../../types/PartesVehiculo";

interface PartesVehiculoContextType {
  estructuraPartes: EstructuraPartes;
  loading: boolean;
  error: string | null;
}

export const PartesVehiculoContext = createContext<PartesVehiculoContextType>({
  estructuraPartes: {},
  loading: false,
  error: null,
});