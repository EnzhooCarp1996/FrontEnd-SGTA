import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface BotonAccionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: LucideIcon;
    label: string;
    color?: "blue" | "green" | "red" | "gray";
}

export const BotonAccion: React.FC<BotonAccionProps> = ({
    icon: Icon,
    label,
    color = "blue",
    className = "",
    ...props
}) => {
    const baseStyles =
        "flex items-center gap-2 text-white rounded-lg transition-colors font-medium";

    const colorStyles = {
        blue: "bg-blue-600 hover:bg-blue-700",
        green: "bg-green-600 hover:bg-green-700",
        red: "bg-red-600 hover:bg-red-700",
        gray: "bg-gray-600 hover:bg-gray-700",
    }[color];

    const sizeStyles =
        "px-2 py-1 text-sm sm:px-3 sm:py-1.5 md:px-4 md:py-2 md:text-base";

    return (
        <button
            className={`${baseStyles} ${colorStyles} ${sizeStyles} ${className}`}
            {...props}
        >
            {Icon && (
                <Icon
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    strokeWidth={2}
                />
            )}
            <span className="truncate">{label}</span>
        </button>
    );
};
