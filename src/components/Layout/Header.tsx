import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  vistaActual: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, vistaActual}) => {
  const getViewTitle = (view: string) => {
    const titles = {
      panelDeControl: 'Panel de Control',
      clientes: 'Gestión de Clientes',
      vehiculos: 'Gestión de Vehículos',
      presupuestos: 'Gestión de Presupuestos',
    };
    return titles[view as keyof typeof titles] || 'SGTA';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {getViewTitle(vistaActual)}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-gray-700 font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;