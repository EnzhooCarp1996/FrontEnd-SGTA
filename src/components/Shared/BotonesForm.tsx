import { Save } from "lucide-react";
import React from "react";

interface BotonesFormProps {
  onGuardar?: () => void;
  onCancel: () => void;
}

export const BotonesForm: React.FC<BotonesFormProps> = ({
  onGuardar,
  onCancel,
}) => {
  return (
    <div className="flex space-x-4 pt-6 border-t border-gray-200">
      <button
        type="submit"
        onClick={onGuardar}
        className="flex-1 bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
      >
        <Save className="w-5 h-5" />
        <span>Guardar</span>
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
};
