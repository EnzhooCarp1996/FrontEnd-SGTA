import React, { useState } from 'react';
import { Search, Car, Calendar, User } from 'lucide-react';
import { Vehiculo } from '../../types';
import { HeaderEntidad } from '../HeaderEntidad/HeaderEntidad';
import { EntidadNotFound } from '../EntidadNotFound/EntidadNotFound';
import { FiltrosEntidad } from '../FiltrosEntidad/FiltrosEntidad';
import { BotonesTarjeta } from '../BotonesTarjeta/BotonesTarjeta';

interface VehiculosListProps {
  onAddVehiculo: () => void;
  onEditVehiculo: (vehiculo: Vehiculo) => void;
}

const VehiculosList: React.FC<VehiculosListProps> = ({ onAddVehiculo, onEditVehiculo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('all');

  // Mock data
  const vehiculos: Vehiculo[] = [
    {
      idVehiculo: '1',
      patente: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      nroDeChasis: 'JTDBU4DK4KJ123456',
      estado: 'Proceso',
      fechaRecibido: '2025-07-15',
      fechaEsperada: '2025-08-25',
      descripcionTrabajos: 'Reparación de chapa lateral y pintura completa',
      idCliente: 1
    },
    {
      idVehiculo: '2',
      patente: 'XYZ789',
      marca: 'Ford',
      modelo: 'Focus',
      anio: 2019,
      nroDeChasis: '1FAFP34N6YW123456',
      estado: 'Recibido',
      fechaRecibido: '2025-07-20',
      fechaEsperada: '2025-08-30',
      descripcionTrabajos: 'Pintura de paragolpes delantero',
      idCliente: 2
    },
    {
      idVehiculo: '3',
      patente: 'LMN456',
      marca: 'Chevrolet',
      modelo: 'Cruze',
      anio: 2021,
      nroDeChasis: '1G1BC5SM5M7123456',
      estado: 'Entregado',
      fechaRecibido: '2025-01-10',
      fechaEsperada: '2025-01-18',
      fechaEntrega: '2025-01-17',
      descripcionTrabajos: 'Arreglo de rayones en puerta',
      idCliente: 3
    }
  ];

  const filteredVehiculos = vehiculos.filter(vehiculo => {
    const matchesSearch =
      vehiculo.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterEstado === 'all' || vehiculo.estado === filterEstado;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Recibido': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'No Recibido': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Proceso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Entregado': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No definida';
    return new Date(dateString).toLocaleDateString('es-AR');
  };

  const getDaysFromNow = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const estados = [
    { value: "all", label: "Todos los estados" },
    { value: "No Recibido", label: "No Recibido" },
    { value: "Recibido", label: "Recibido" },
    { value: "Proceso", label: "En Proceso" },
    { value: "Entregado", label: "Entregado" },
  ];

  return (
    <div className="p-6">
      {/* Header */}

      <HeaderEntidad
        titulo="Vehículos"
        textoGestion="los vehículos en el taller"
        onClick={onAddVehiculo}
        textoBoton="Agregar Vehículo"
      />

      {/* Filters */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por patente, marca o modelo..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        selectValue={filterEstado}
        onSelectChange={(e) => setFilterEstado(e.target.value)}
        selectOptions={estados}
      />


      {/* Vehiculos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredVehiculos.map((vehiculo) => {
          const daysToExpected = getDaysFromNow(vehiculo.fechaEsperada);
          const isOverdue = daysToExpected !== null && daysToExpected < 0 && vehiculo.estado !== 'Entregado';

          return (
            <div key={vehiculo.idVehiculo} className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md 
                                                       hover:border-green-500 transform hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Car className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{vehiculo.patente}</h3>
                    <p className="text-gray-600">{vehiculo.marca} {vehiculo.modelo} ({vehiculo.anio})</p>
                  </div>
                </div>

                <BotonesTarjeta
                  onEdit={() => onEditVehiculo(vehiculo)}
                //onDelete={() => onDeleteVehiculo(vehiculo)}
                />

              </div>

              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehiculo.estado)}`}>
                  {vehiculo.estado}
                </span>
                {isOverdue && (
                  <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Vencido
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Recepción: {formatDate(vehiculo.fechaRecibido)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Esperada: {formatDate(vehiculo.fechaEsperada)}</span>
                  {daysToExpected !== null && vehiculo.estado !== 'Entregado' && (
                    <span className={`text-xs px-2 py-1 rounded-full ${daysToExpected < 0 ? 'bg-red-100 text-red-700' :
                      daysToExpected <= 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                      {daysToExpected < 0 ? `${Math.abs(daysToExpected)} días vencido` :
                        daysToExpected === 0 ? 'Hoy' :
                          `${daysToExpected} días`}
                    </span>
                  )}
                </div>
                {vehiculo.fechaEntrega && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Entregado: {formatDate(vehiculo.fechaEntrega)}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 font-medium mb-1">Trabajos:</p>
                <p className="text-sm text-gray-600 line-clamp-2">{vehiculo.descripcionTrabajos}</p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {vehiculo.idCliente}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehiculos.length === 0 && (

        <EntidadNotFound
          icon={<Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
          titulo="vehiculos"
        />

      )}
    </div>
  );
};

export default VehiculosList;