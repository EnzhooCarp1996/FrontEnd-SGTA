import { LabelForm } from "./LabelForm";
import { useId } from "react";

interface InputFormProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  step?: string;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

export const FormField: React.FC<InputFormProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder = "",
  step = "",
  error,
  readOnly = false,
  disabled = false,
}) => {
  const id = useId();

  return (
    <div className="grid grid-cols-1 md:grid-cols-1">
      <LabelForm htmlFor={id} label={label} required={required} />
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${readOnly || disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        placeholder={placeholder}
        step={step}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
