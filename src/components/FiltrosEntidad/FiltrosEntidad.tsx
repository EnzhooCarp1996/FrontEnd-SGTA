import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BuscadorEntidad } from '../BuscadorEntidad/BuscadorEntidad';
import { SelectEntidad } from '../SelectEntidad/SelectEntidad';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface FiltrosEntidadProps<T extends string> {
  buscadorIcon: LucideIcon;
  buscadorPlaceholder: string;
  buscadorValue: string;
  onBuscadorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  selectValue: T;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: Option<T>[];
}

export const FiltrosEntidad = <T extends string>({
  buscadorIcon,
  buscadorPlaceholder,
  buscadorValue,
  onBuscadorChange,
  selectValue,
  onSelectChange,
  selectOptions,
}: FiltrosEntidadProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <BuscadorEntidad
          icon={buscadorIcon}
          placeholder={buscadorPlaceholder}
          value={buscadorValue}
          onChange={onBuscadorChange}
        />

        <SelectEntidad
          value={selectValue}
          onChange={onSelectChange}
          options={selectOptions}
        />
      </div>
    </div>
  );
};
