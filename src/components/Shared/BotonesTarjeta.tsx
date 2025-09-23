import { Edit, Trash2 } from "lucide-react";

interface BotonesTarjetaProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

export const BotonesTarjeta: React.FC<BotonesTarjetaProps> = ({ onEdit, onDelete }) => {
    return (
        <div className="flex space-x-2 justify-center items-center">
            <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={onDelete}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};
