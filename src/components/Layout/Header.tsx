import { Menu, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuToggle: () => void;
  vistaActual: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { nombreUsuario, role, logout } = useAuth();
  

  return (
    <header className="bg-green-500 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Clinica del Automóvil
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </button> */}

          <button className="flex items-center space-x-2 p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors">
            <UserCheck className="w-6 h-6 text-black" />
            <span className="text-black font-medium">{nombreUsuario}</span>
            <span className="text-black font-medium">({role})</span>
          </button>
          <button onClick={logout} className="flex items-center space-x-2 p-2 rounded-lg bg-green-600 hover:bg-red-600 transition-colors">
            <LogOut className="w-6 h-6 text-black" />
            {/* <span className="text-gray-700 font-medium">Cerrar Sesion</span> */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;