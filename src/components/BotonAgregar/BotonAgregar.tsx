import { Plus } from "lucide-react";
import React from "react";

interface BotonAgregarProps {
    onClick: () => void;
    textoAgregar: string;
}

export const BotonAgregar: React.FC<BotonAgregarProps> = ({ onClick, textoAgregar }) => {
    return (
        <button
            onClick={onClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
            <Plus className="w-5 h-5" />
            <span>{textoAgregar}</span>
        </button>
    );
};
