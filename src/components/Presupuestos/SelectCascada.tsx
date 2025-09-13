interface SelectCascadaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opciones: string[];
  disabled?: boolean;
  descripcionCompleta?: (...args: string[]) => string;
  estaUsada?: (desc: string) => boolean;
  placeholder?: string;
}

export const SelectCascada: React.FC<SelectCascadaProps> = ({
  value,
  onChange,
  opciones,
  disabled = false,
  descripcionCompleta,
  estaUsada,
  placeholder = 'Seleccione',
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border rounded px-2 py-1 w-[110px]"
    >
      <option value="">{placeholder}</option>
      {opciones.map((opcion) => {
        const desc = descripcionCompleta ? descripcionCompleta(opcion) : opcion;
        const isDisabled = estaUsada ? estaUsada(desc) : false;
        return (
          <option key={opcion} value={opcion} disabled={isDisabled}>
            {opcion} {isDisabled ? '(usado)' : ''}
          </option>
        );
      })}
    </select>
  );
};
