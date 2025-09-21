import { Car, Users, FileText, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const PanelDeControl: React.FC = () => {
  const stats = [
    {
      title: 'Vehículos en Proceso',
      value: '12',
      icon: Car,
      color: 'bg-green-500',
      trend: '+2.5%'
    },
    {
      title: 'Clientes Activos',
      value: '48',
      icon: Users,
      color: 'bg-blue-500',
      trend: '+8.1%'
    },
    {
      title: 'Presupuestos del Mes',
      value: '$15,240',
      icon: FileText,
      color: 'bg-purple-500',
      trend: '+12.3%'
    },
    {
      title: 'Trabajos Pendientes',
      value: '7',
      icon: Clock,
      color: 'bg-orange-500',
      trend: '-5.2%'
    }
  ];

  const recentVehicles = [
    { patente: 'ABC123', marca: 'Toyota', modelo: 'Corolla', estado: 'Proceso', cliente: 'Juan Pérez' },
    { patente: 'XYZ789', marca: 'Ford', modelo: 'Focus', estado: 'Recibido', cliente: 'María García' },
    { patente: 'LMN456', marca: 'Chevrolet', modelo: 'Cruze', estado: 'Entregado', cliente: 'Carlos López' },
    { patente: 'PQR012', marca: 'Volkswagen', modelo: 'Golf', estado: 'Proceso', cliente: 'Ana Martínez' },
  ];

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Recibido': return 'bg-blue-100 text-blue-800';
      case 'Proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Entregado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vehicles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Vehículos Recientes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentVehicles.map((vehicle, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{vehicle.patente}</p>
                      <p className="text-sm text-gray-500">{vehicle.marca} {vehicle.modelo}</p>
                      <p className="text-sm text-gray-500">{vehicle.cliente}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.estado)}`}>
                    {vehicle.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Alertas y Notificaciones</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">Trabajo Vencido</p>
                  <p className="text-sm text-orange-700">El vehículo ABC123 debía entregarse ayer</p>
                  <p className="text-xs text-orange-600 mt-1">Hace 1 día</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Nuevo Cliente</p>
                  <p className="text-sm text-blue-700">Se registró un nuevo cliente: Roberto Silva</p>
                  <p className="text-xs text-blue-600 mt-1">Hace 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <AlertCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Trabajo Completado</p>
                  <p className="text-sm text-green-700">Vehículo XYZ789 listo para entrega</p>
                  <p className="text-xs text-green-600 mt-1">Hace 3 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelDeControl;