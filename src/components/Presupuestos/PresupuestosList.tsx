import React, { useEffect, useState } from 'react';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { Cliente, Presupuesto } from '../../types';
import { HeaderEntidad } from '../HeaderEntidad/HeaderEntidad';
import { EntidadNotFound } from '../EntidadNotFound/EntidadNotFound';
import { FiltrosEntidad } from '../FiltrosEntidad/FiltrosEntidad';
import { BotonesTarjeta } from '../BotonesTarjeta/BotonesTarjeta';
import { TarjetaSpan } from '../Clientes/TarjetaSpan/TarjetaSpan';
import { deletePresupuesto, getPresupuestos } from '../../Services/PresupuestoService';
import { getClientes } from '../../Services/ClienteService';

interface PresupuestosListProps {
  onAddPresupuesto: () => void;
  onEditPresupuesto: (presupuesto: Presupuesto) => void;
}

const PresupuestosList: React.FC<PresupuestosListProps> = ({ onAddPresupuesto: onAddPresupuesto, onEditPresupuesto: onEditPresupuesto }) => {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    getPresupuestos(token)
      .then((data) => setPresupuestos(data))
      .catch((err) => console.error(err));

    getClientes(token)
      .then(data => setClientes(data))
      .catch(err => console.error(err));
  }, [token]);

  // -------------------------------
  // HANDLERS CRUD
  // -------------------------------
  const handleDeletePresupuesto = async (id: number) => {
    if (!token) return;
    try {
      await deletePresupuesto(token, id);
      setPresupuestos(prev => prev.filter(c => c.idCliente !== id));
    } catch (err) {
      console.error(err);
    }
  };


  const filteredPresupuestos = presupuestos.filter(presupuesto => {
    const matchesSearch = presupuesto.idPresupuesto.toString().includes(searchTerm);

    const presupuestoMonth = new Date(presupuesto.fecha).getMonth();
    const currentMonth = new Date().getMonth();
    const matchesFilter = filterMonth === 'all' ||
      (filterMonth === 'current' && presupuestoMonth === currentMonth) ||
      (filterMonth === 'previous' && presupuestoMonth === currentMonth - 1);

    return matchesSearch && matchesFilter;
  });

  const getClienteNombre = (idCliente?: number) => {
    if (!idCliente) return "Sin Cliente";
    const cliente = clientes.find(c => c.idCliente === idCliente);
    if (!cliente) return "Sin Cliente";
    return cliente.tipoCliente === 'Empresa'
      ? cliente.nombreDeFantasia
      : `${cliente.nombre} ${cliente.apellido}`;
  };

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
        textoGestion="los presupuestos del taller"
        onClick={onAddPresupuesto}
        textoBoton="Nuevo Presupuesto"
      />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por número de presupuesto..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        selectValue={filterMonth}
        onSelectChange={(e) => setFilterMonth(e.target.value)}
        selectOptions={opcionesMeses}
      />

      {/* Presupuestos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredPresupuestos.map((presupuesto) => {

          return (
            <div key={presupuesto.idPresupuesto} className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md 
                                                       hover:border-green-500 transform hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{presupuesto.idPresupuesto}</h3>
                  </div>
                </div>

                <BotonesTarjeta
                  onEdit={() => onEditPresupuesto(presupuesto)}
                  onDelete={() => handleDeletePresupuesto(presupuesto.idPresupuesto)}
                />

              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Fecha: {formatDate(presupuesto.fecha)}</span>
                </div>

                <TarjetaSpan >
                  <span className="font-medium">Mano de obra Pintura: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraPintura)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Mano de obra Chapa: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraChapa)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Total Repuestos: </span>
                  <span>{formatCurrency(presupuesto.totalRepuestos)}</span>
                </TarjetaSpan>
                <TarjetaSpan >
                  <span className="font-medium">Total: </span>
                  <span>{formatCurrency(presupuesto.manoDeObraChapa + presupuesto.manoDeObraPintura + presupuesto.totalRepuestos)}</span>
                </TarjetaSpan>

              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {getClienteNombre(presupuesto.idCliente)}</span>
              </div>
            </div>
          );
        })}
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