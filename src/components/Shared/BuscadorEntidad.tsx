import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BuscadorEntidadProps {
  icon: LucideIcon; // Icono de lucide-react
  placeholder?: string;
  value: string;
  name: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BuscadorEntidad: React.FC<BuscadorEntidadProps> = ({ icon: Icon, placeholder, value, id, name, onChange }) => {
  return (
    <div className="flex-1 relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        id={id || name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
};
