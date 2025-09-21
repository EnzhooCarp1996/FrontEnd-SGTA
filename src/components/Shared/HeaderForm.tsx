import { LucideIcon, X } from "lucide-react";

interface HeaderFormProps {
  icon: LucideIcon;            // Ícono (User, Car, etc.)
  tituloNuevo: string;         // Texto cuando es nuevo
  tituloEditar?: string;        // Texto cuando edita
  condicion?: boolean;         // Si existe o no (ej: cliente o vehiculo)
  onCancel: () => void;        // Acción al cerrar
}

export const HeaderForm: React.FC<HeaderFormProps> = ({
  icon: Icon,
  tituloNuevo,
  tituloEditar,
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
          {condicion ? tituloEditar : tituloNuevo}
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
