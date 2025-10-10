import { LucideIcon } from "lucide-react";
import { BotonesTarjeta } from "./BotonesTarjeta";

interface CardHeaderProps {
  icon: LucideIcon;               // Icono principal
  iconBgClass?: string;           // Fondo del icono, ej. bg-green-100
  iconColorClass?: string;        // Color del icono, ej. text-green-600
  title?: string;                  // Título principal
  subtitle?: string;              // Información secundaria
  buttons?: {
    onEdit?: () => void;
    onDelete?: () => void;
  };
  className?: string;             // Clases extra opcionales
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  icon: Icon,
  iconBgClass = "bg-green-100",
  iconColorClass = "text-green-600",
  title,
  subtitle,
  buttons,
  className = "",
}) => {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${iconBgClass}`}>
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {buttons && (buttons.onEdit || buttons.onDelete) && (
        <BotonesTarjeta
          onEdit={buttons.onEdit}
          onDelete={buttons.onDelete}
        />
      )}
    </div>
  );
};
