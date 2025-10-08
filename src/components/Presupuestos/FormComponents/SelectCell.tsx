interface SelectCellProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectCell: React.FC<SelectCellProps> = ({ id, name, value, onChange }) => (
  <td className="border border-gray-600 px-2 py-1 w-[60px]">
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-1 py-1"
    >
      <option value="">--</option>
      <option value="X">X</option>
    </select>
  </td>
);
