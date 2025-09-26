import { /*Home,*/ Users, Car, FileText, PaintBucket, X, User } from 'lucide-react';

interface BarraLateralProps {
  role: string;
  vistaActual: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const BarraLateral: React.FC<BarraLateralProps> = ({ role, vistaActual, onViewChange, isOpen, onToggle }) => {
  const allMenuItems = [
    // { id: 'panelDeControl', label: 'Panel de control', icon: Home },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'vehiculos', label: 'Vehículos', icon: Car },
    { id: 'presupuestos', label: 'Presupuestos', icon: FileText },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
  ];

  const menuItems =
    role === "Admin"
      ? allMenuItems.filter((item) => item.id === "usuarios")
      : allMenuItems.filter((item) => item.id !== "usuarios");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Barra lateral */}
      <div
        className={`
        fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-green-800 to-green-900 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        flex flex-col
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-green-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <PaintBucket className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">SGTA</h1>
              <p className="text-green-300 text-sm">Sistema de Gestion de Taller Automotriz</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:text-green-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = vistaActual === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`
                  w-full flex items-center space-x-3 px-6 py-4 text-left
                  transition-all duration-200 hover:bg-green-700
                  ${isActive ? "bg-green-700 border-r-4 border-green-400" : ""}
                `}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-green-300" : "text-green-400"
                    }`}
                />
                <span
                  className={`font-medium ${isActive ? "text-white" : "text-green-200"
                    }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
        {/* Footer */}
        <footer className="mt-auto p-4 text-center text-sm text-green-300 border-t border-green-700 flex flex-col items-start">
          &copy; {new Date().getFullYear()} SGTA.
          <div className="flex items-center space-x-1 mt-1">
            <User className="w-4 h-4" />By
            <span className="font-bold text-white">Enzo Olmedo</span>
          </div>
        </footer>
      </div>

    </>
  );
};

export default BarraLateral;