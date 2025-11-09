import { ReactNode } from "react";
import { X } from "lucide-react";

interface HeaderVistaPreviaProps {
    title: string | ReactNode;
    onClose: () => void;
}

export const HeaderVistaPrevia: React.FC<HeaderVistaPreviaProps> = ({ title, onClose }) => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-2 p-4 border-b bg-white">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>

            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar"
            >
                <X className="w-5 h-5 text-red-600" />
            </button>
        </div>
    );
};

