import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // Para agregar estilos adicionales si hace falta
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md hover:border-green-500 transform hover:-translate-y-1 transition-all ${className}`}
    >
      {children}
    </div>
  );
};
