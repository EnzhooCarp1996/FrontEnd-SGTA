
interface RadioCardOptionProps<T> {
  name: string;
  value: T;
  label: string;
  icon: React.ElementType;
  selectedValue: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}

export const RadioCardOption = <T extends string>({
  name,
  value,
  label,
  icon: Icon,
  selectedValue,
  onChange,
}: RadioCardOptionProps<T>) => {
  const isActive = selectedValue === value;

  return (
    <label
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
        isActive
          ? "bg-green-50 border-green-300 text-green-700"
          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isActive}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </label>
  );
}
