import { LabelForm } from "../../Shared/LabelForm";

interface SelectOption {
    value: string | number;
    label?: string;
}

interface SelectFormProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
    error?: string;
    disabled?: boolean;
}

export const SelectForm: React.FC<SelectFormProps> = ({ id, name, label, value, onChange, options, required, error, disabled, }) => {
    return (
        <div>
            <LabelForm htmlFor={id} label={label} required={required} />
            <select
                id={id}
                name={name}
                value={String(value)}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
        `}
            >
                <option value="" disabled>
                    Seleccione
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
