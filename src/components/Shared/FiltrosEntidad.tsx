import { BuscadorEntidad } from './BuscadorEntidad';
import { SelectEntidad } from './SelectEntidad';
import { LucideIcon } from 'lucide-react';


interface Option<T extends string> {
  value: T;
  label: string;
}

interface FiltrosEntidadProps<T extends string> {
  buscadorIcon: LucideIcon;
  buscadorPlaceholder: string;
  buscadorValue: string;
  onBuscadorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buscadorId: string;
  buscadorName: string;

  selectValue: T;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: Option<T>[];
  selectId: string;
  selectName: string;
}

export const FiltrosEntidad = <T extends string>({
  buscadorIcon,
  buscadorPlaceholder,
  buscadorValue,
  onBuscadorChange,
  buscadorId,
  buscadorName,
  selectValue,
  onSelectChange,
  selectOptions,
  selectId,
  selectName
}: FiltrosEntidadProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <BuscadorEntidad
          icon={buscadorIcon}
          placeholder={`Buscar por ${buscadorPlaceholder}...`}
          value={buscadorValue}
          onChange={onBuscadorChange}
          id={buscadorId}
          name={buscadorName}
        />

        <SelectEntidad
          value={selectValue}
          onChange={onSelectChange}
          options={selectOptions}
          id={selectId}
          name={selectName}
        />
      </div>
    </div>
  );
};
