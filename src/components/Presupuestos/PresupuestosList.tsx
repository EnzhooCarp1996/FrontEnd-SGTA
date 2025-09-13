import React, { useState } from 'react';
import { Search, FileText, Calendar } from 'lucide-react';
import { Presupuesto } from '../../types';
import { HeaderEntidad } from '../HeaderEntidad/HeaderEntidad';
import { EntidadNotFound } from '../EntidadNotFound/EntidadNotFound';
import { FiltrosEntidad } from '../FiltrosEntidad/FiltrosEntidad';
import { BotonesTarjeta } from '../BotonesTarjeta/BotonesTarjeta';

interface PresupuestosListProps {
  onAddPresupuesto: () => void;
  onEditPresupuesto: (presupuesto: Presupuesto) => void;
}

const PresupuestosList: React.FC<PresupuestosListProps> = ({ onAddPresupuesto: onAddPresupuesto, onEditPresupuesto: onEditPresupuesto }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  // Mock data
  const presupuestos: Presupuesto[] = [
    {
      idPresupuesto: '001-00000001',
      fecha: '2024-01-15',
      manoDeObraChapa: 20000,
      manoDeObraPintura: 50000,
      totalRepuestos: 25000,
      idCliente: 1
    },
    {
      idPresupuesto: '001-00000002',
      fecha: '2024-01-18',
      manoDeObraChapa: 20000,
      manoDeObraPintura: 50000,
      totalRepuestos: 25000,
      idCliente: 2
    },
    {
      idPresupuesto: '001-00000003',
      fecha: '2024-01-20',
      manoDeObraChapa: 20000,
      manoDeObraPintura: 50000,
      totalRepuestos: 25000,
      idCliente: 3
    },
    {
      idPresupuesto: '001-00000004',
      fecha: '2024-01-22',
      manoDeObraChapa: 20000,
      manoDeObraPintura: 50000,
      totalRepuestos: 25000,
      idCliente: 4
    },
    {
      idPresupuesto: '001-00000005',
      fecha: '2024-01-25',
      manoDeObraChapa: 20000,
      manoDeObraPintura: 50000,
      totalRepuestos: 25000,
      idCliente: 5
    }
  ];


  const filteredPresupuestos = presupuestos.filter(presupuesto => {
    const matchesSearch = presupuesto.idPresupuesto.toLowerCase().includes(searchTerm.toLowerCase());

    const presupuestoMonth = new Date(presupuesto.fecha).getMonth();
    const currentMonth = new Date().getMonth();
    const matchesFilter = filterMonth === 'all' ||
      (filterMonth === 'current' && presupuestoMonth === currentMonth) ||
      (filterMonth === 'previous' && presupuestoMonth === currentMonth - 1);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const opcionesMeses = [
    { value: "all", label: "Todos los Meses" },
    { value: "current", label: "Mes actual" },
    { value: "previous", label: "Mes anterior" },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <HeaderEntidad
        titulo="Presupuestos"
        textoGestion="el presupuesto del taller"
        onClick={onAddPresupuesto}
        textoBoton="Nuevo Presupuesto"
      />

      {/* Filters */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por número de presupuesto..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        selectValue={filterMonth}
        onSelectChange={(e) => setFilterMonth(e.target.value)}
        selectOptions={opcionesMeses}
      />


      {/* Presupuesto Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-400 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-400">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {filteredPresupuestos.map((presupuesto) => (
                <tr key={presupuesto.idPresupuesto} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {presupuesto.idPresupuesto}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(presupuesto.fecha)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(presupuesto.totalRepuestos)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                    <div className="flex justify-end space-x-2">
                      <BotonesTarjeta
                        onEdit={() => onEditPresupuesto(presupuesto)}
                      //onDelete={() => onDeletePresupuesto(presupuesto)}
                      />
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPresupuestos.length === 0 && (
        <EntidadNotFound
          icon={<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
          titulo="presupuestos"
        />
      )}
    </div>
  );
};

export default PresupuestosList;