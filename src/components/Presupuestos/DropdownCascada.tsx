import { SelectCascada } from './SelectCascada';
import { useState, useEffect } from 'react';
import { getPartesVehiculo } from '../../Services/PartesVehiculoService';
import { useAuth } from "../../hooks/useAuth";
import { PartesVehiculo } from "../../types/PartesVehiculo";

interface Props {
  ubicacion: string;
  onSelect: (descripcion: string) => void;
  valorActual: string;
  descripcionesUsadas: string[];
}
export type EstructuraPartes = {
  [categoria: string]: {
    [componente: string]:
    | null // ej: "Panel" (sin subcomponentes ni detalles)
    | {
      [subcomponente: string]: string[]; // ej: "delantera": ["cristal", "moldura"]
    };
  };
};


export const DropdownCascada: React.FC<Props> = ({
  ubicacion,
  onSelect,
  valorActual,
  descripcionesUsadas: descripcionUsadas,
}) => {
  const [estructuraPartes, setEstructuraPartes] = useState<EstructuraPartes>({});

  const { token } = useAuth();
  const [parte1, setParte1] = useState('');
  const [parte2, setParte2] = useState('');
  const [parte3, setParte3] = useState('');


  useEffect(() => {
    if (!token) return;
    getPartesVehiculo(token)
      .then((data: PartesVehiculo[]) => {
        const mapa: EstructuraPartes = {};

        data.forEach(pv => {
          const componentes: {
            [componente: string]: null | { [sub: string]: string[] };
          } = {};

          pv.componentes.forEach(c => {
            if (c.subcomponentes) {
              const subMap: { [sub: string]: string[] } = {};
              c.subcomponentes.forEach(sc => {
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
      .catch(err => console.error(err));
  }, [token]);



  useEffect(() => {
    if (!valorActual) {
      setParte1('');
      setParte2('');
      setParte3('');
      return;
    }
    const partesSplit = valorActual.split('|');
    setParte1(partesSplit[0] || '');
    setParte2(partesSplit[1] || '');
    setParte3(partesSplit[2] || '');
  }, [valorActual]);


  const descripcionCompleta = (p1: string, p2?: string, p3?: string) =>
    [p1, p2, p3].filter(Boolean).join(' ');

  const estaUsada = (desc: string) =>
    descripcionUsadas.includes(desc) && desc !== valorActual;

  const opcionesParte1 = estructuraPartes[ubicacion]
    ? Object.keys(estructuraPartes[ubicacion])
    : [];

  const opcionesParte2 =
    parte1 &&
      estructuraPartes[ubicacion] &&
      estructuraPartes[ubicacion][parte1] &&
      estructuraPartes[ubicacion][parte1] !== null
      ? Object.keys(estructuraPartes[ubicacion][parte1] as Record<string, string[]>)
      : [];

  const opcionesParte3 =
    parte1 &&
      parte2 &&
      estructuraPartes[ubicacion] &&
      estructuraPartes[ubicacion][parte1] &&
      estructuraPartes[ubicacion][parte1] !== null
      ? (estructuraPartes[ubicacion][parte1] as Record<string, string[]>)[parte2] || []
      : [];




  const onChangeParte1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte1(val);
    setParte2('');
    setParte3('');
    if (!estructuraPartes[val]) {
      onSelect(val);
    }
  };

  const onChangeParte2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte2(val);
    setParte3('');
    if (estructuraPartes[parte1] && typeof estructuraPartes[parte1] === 'object' && !Array.isArray(estructuraPartes[parte1])) {
      if (estructuraPartes[parte1][val] === null) {
        onSelect(`${parte1} ${val}`);
      }
    }
  };

  const onChangeParte3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte3(val);
    onSelect([parte1, parte2, val].filter(Boolean).join('|')); // <- usar '|'
  };


  return (
    <div className="flex space-x-2">
      {/* Select parte 1 */}
      <SelectCascada
        value={parte1}
        onChange={onChangeParte1}
        opciones={opcionesParte1}
        descripcionCompleta={descripcionCompleta}
        estaUsada={estaUsada}
      />
      {/* Select parte 2 */}
      <SelectCascada
        value={parte2}
        onChange={onChangeParte2}
        opciones={opcionesParte2}
        descripcionCompleta={(p2) => descripcionCompleta(parte1, p2)}
        estaUsada={estaUsada}
        disabled={!parte1}
      />
      {/* Select parte 3 */}
      <SelectCascada
        value={parte3}
        onChange={onChangeParte3}
        opciones={opcionesParte3}
        descripcionCompleta={(p3) => descripcionCompleta(parte1, parte2, p3)}
        estaUsada={estaUsada}
        disabled={!parte2}
      />
    </div>
  );
};
