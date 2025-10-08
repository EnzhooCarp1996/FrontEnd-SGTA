interface InputCellProps {
  id: string;
  name: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  min?: string;
  step?: string;
}

export const InputCell: React.FC<InputCellProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  min,
  step
}) => (
  <td className="border border-gray-600 px-2 py-1">
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full border rounded px-1 py-1"
      min={min}
      step={step}
    />
  </td>
);
