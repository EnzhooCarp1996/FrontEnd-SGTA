import estructuraPartesJson from "../../data/estructuraPartes.json";
import { EstructuraPartes, NodoParte } from "../../types/index";
import { SelectCascada } from './SelectCascada';
import { useState, useEffect } from 'react';


interface Props {
  ubicacion: string;
  onSelect: (descripcion: string) => void;
  valorActual: string;
  descripcionesUsadas: string[];
}

const estructuraPartes = estructuraPartesJson as EstructuraPartes;


export const DropdownCascada: React.FC<Props> = ({
  ubicacion,
  onSelect,
  valorActual,
  descripcionesUsadas: descripcionUsadas,
}) => {
  const partes: NodoParte = (estructuraPartes[ubicacion] ?? {}) as NodoParte;

  const [parte1, setParte1] = useState('');
  const [parte2, setParte2] = useState('');
  const [parte3, setParte3] = useState('');

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

  const opcionesParte2 =
    parte1 &&
      partes[parte1] &&
      typeof partes[parte1] === 'object' &&
      !Array.isArray(partes[parte1])
      ? Object.keys(partes[parte1] as NodoParte)
      : [];

  const opcionesParte3 =
    parte1 &&
      parte2 &&
      partes[parte1] &&
      typeof partes[parte1] === 'object' &&
      !Array.isArray(partes[parte1]) &&
      partes[parte1][parte2] &&
      Array.isArray(partes[parte1][parte2])
      ? (partes[parte1][parte2] as string[])
      : [];


  const onChangeParte1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte1(val);
    setParte2('');
    setParte3('');
    if (!partes[val]) {
      onSelect(val);
    }
  };

  const onChangeParte2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte2(val);
    setParte3('');
    if (partes[parte1] && typeof partes[parte1] === 'object' && !Array.isArray(partes[parte1])) {
      if (partes[parte1][val] === null) {
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
        opciones={Object.keys(partes)}
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
