
interface LabelFormProps {
  htmlFor: string;
  label: string;
  required?: boolean;
}

export const LabelForm: React.FC<LabelFormProps> = ({ htmlFor, label, required }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

