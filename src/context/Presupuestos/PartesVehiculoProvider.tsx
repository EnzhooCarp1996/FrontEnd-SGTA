import { EstructuraPartes, NuevaParteDto, PartesVehiculo } from "../../types/PartesVehiculo";
import { agregarComponente, getPartesVehiculo } from "../../Services/PartesVehiculoService";
import { PartesVehiculoContext } from "./PartesVehiculoContext";
import { useState, useEffect, ReactNode } from "react";

export const PartesVehiculoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partesVehiculo, setPartesVehiculo] = useState<PartesVehiculo[]>([]);
  const [estructuraPartes, setEstructuraPartes] = useState<EstructuraPartes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const transformToEstructura = (data: PartesVehiculo[]): EstructuraPartes => {
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
    return mapa;
  };

  // Fetch inicial
  useEffect(() => {
    setLoading(true);
    getPartesVehiculo()
      .then((data) => {
        setPartesVehiculo(data);
        setEstructuraPartes(transformToEstructura(data));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Función para agregar un componente
  const addComponente = async (dto: NuevaParteDto) => {
    try {
      const resultado = await agregarComponente(dto);
      // Refrescar datos después de agregar
      const data = await getPartesVehiculo();
      setPartesVehiculo(data);
      setEstructuraPartes(transformToEstructura(data));
      return resultado;
    } catch (err: any) {
      return err.message;
    }
  };

  return (
    <PartesVehiculoContext.Provider
      value={{ partesVehiculo, estructuraPartes, loading, error, addComponente }}
    >
      {children}
    </PartesVehiculoContext.Provider>
  );
};