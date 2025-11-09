import { LucideIcon, X } from "lucide-react";

interface HeaderFormProps {
  icon: LucideIcon;
  titulo: string;
  condicion?: boolean;
  onCancel: () => void;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({
  icon: Icon,
  titulo,
  condicion = false,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {condicion ? `Nuevo ${titulo}` : `Editar ${titulo}`}
        </h2>
      </div>
      <button
        onClick={onCancel}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X className="w-5 h-5 text-red-600" />
      </button>
    </div>
  );
};
