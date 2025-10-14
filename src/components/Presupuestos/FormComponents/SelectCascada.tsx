interface SelectCascadaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opciones: string[];
  disabled?: boolean;
  descripcionCompleta?: (...args: string[]) => string;
  estaUsada?: (desc: string) => boolean;
  placeholder?: string;
}

export const SelectCascada: React.FC<SelectCascadaProps> = ({
  id,
  name,
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
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border rounded px-2 py-1 w-[110px]"
    >
      <option value="">{placeholder}</option>
      {opciones.map((opcion) => {
        const fullDesc = descripcionCompleta ? descripcionCompleta(opcion) : opcion;
        const isDisabled = estaUsada ? estaUsada(fullDesc) : false;
        return (
          <option key={opcion} value={opcion} disabled={isDisabled}>
            {opcion} {isDisabled ? '(usado)' : ''}
          </option>
        );
      })}
    </select>
  );
};
