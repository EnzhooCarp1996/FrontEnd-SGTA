import { useMenuDesplegable } from '../../../hooks/Presupuestos/UseMenuDesplegable';
import { EstructuraPartes } from '../../../types/PartesVehiculo';
import { SelectCascada } from './SelectCascada';

interface MenuDesplegableProps {
  id: string;
  name: string;
  ubicacion: string;
  valorActual: string;
  descripcionUsadas: string[];
  estructuraPartes: EstructuraPartes;
  onSelect: (descripcion: string) => void;
}


export const MenuDesplegable: React.FC<MenuDesplegableProps> = ({
  id, name, ubicacion, valorActual, descripcionUsadas, estructuraPartes, onSelect
}) => {
  const {
    parte1, parte2, parte3,
    setParte1, setParte2, setParte3,
    descripcionCompleta,
    opcionesParte1, opcionesParte2, opcionesParte3
  } = useMenuDesplegable(ubicacion, valorActual, estructuraPartes);

  const estaUsada = (desc: string) => descripcionUsadas.includes(desc) && desc !== valorActual;

  const onChangeParte1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte1(val);
    setParte2('');
    setParte3('');
    if (!opcionesParte2.length && !opcionesParte3.length) {
      onSelect(val);
    }
  };

  const onChangeParte2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte2(val);
    setParte3('');
    if (!opcionesParte3.length) {
      onSelect(`${parte1} ${val}`);
    }
  };

  const onChangeParte3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte3(val);
    onSelect([parte1, parte2, val].filter(Boolean).join('|'));
  };

  return (
    <td className="border border-gray-600 px-1 py-1 relative overflow-visible z-[100]">
    <div className="flex space-x-2">
      <SelectCascada
        id={`parte1-${id}`}
        name={`parte1-${name}`}
        value={parte1}
        onChange={onChangeParte1}
        opciones={opcionesParte1}
        descripcionCompleta={descripcionCompleta}
        estaUsada={estaUsada}
      />
      <SelectCascada
        id={`parte2-${id}`}
        name={`parte2-${name}`}
        value={parte2}
        onChange={onChangeParte2}
        opciones={opcionesParte2}
        descripcionCompleta={(p2) => descripcionCompleta(parte1, p2)}
        estaUsada={estaUsada}
        disabled={!parte1}
      />
      <SelectCascada
        id={`parte3-${id}`}
        name={`parte3-${name}`}
        value={parte3}
        onChange={onChangeParte3}
        opciones={opcionesParte3}
        descripcionCompleta={(p3) => descripcionCompleta(parte1, parte2, p3)}
        estaUsada={estaUsada}
        disabled={!parte2}
      />
    </div>
    </td>
  );
};
