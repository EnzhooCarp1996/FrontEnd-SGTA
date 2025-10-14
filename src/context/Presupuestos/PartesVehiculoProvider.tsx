import { EstructuraPartes, PartesVehiculo } from "../../types/PartesVehiculo";
import { getPartesVehiculo } from "../../Services/PartesVehiculoService";
import { PartesVehiculoContext } from "./PartesVehiculoContext";
import { useState, useEffect } from "react";
import { useAuth } from "../Auth/useAuth";

export const PartesVehiculoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [estructuraPartes, setEstructuraPartes] = useState<EstructuraPartes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getPartesVehiculo(token)
      .then((data: PartesVehiculo[]) => {
        const mapa: EstructuraPartes = {};
        data.forEach((pv) => {
          const componentes: Record<string, null | Record<string, string[]>> = {};
          pv.componentes.forEach((c) => {
            if (c.subcomponentes) {
              const subMap: Record<string, string[]> = {};
              c.subcomponentes.forEach((sc) => {
                subMap[sc.nombre] = sc.detalles ?? [];
              });
              componentes[c.nombre] = subMap;
            } else {
              componentes[c.nombre] = null;
            }
          });
          mapa[pv.categoria] = componentes;
        });
        setEstructuraPartes(mapa);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <PartesVehiculoContext.Provider value={{ estructuraPartes, loading, error }}>
      {children}
    </PartesVehiculoContext.Provider>
  );
};


